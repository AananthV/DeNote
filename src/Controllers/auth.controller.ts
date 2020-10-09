import { Router, Request, Response, NextFunction } from "express";
import logger from "../Utils/logger";
import * as bcrypt from "bcrypt";
import config from "config";
import * as jwt from "jsonwebtoken";
import Imap from "imap";

import Controller from "../Interfaces/controller/controller.interface";
import User from "../Interfaces/model/user.interface";
import TokenData from "../Interfaces/controller/auth/tokendata.interface";
import DataStoredInToken from "../Interfaces/controller/auth/dataStoredInToken.interface";

import validationMiddleware from "../Middlewares/validation.middleware";

import CreateUserDto from "../DataTransferObjects/User/createUser.dto";
import LoginUserDto from "../DataTransferObjects/User/loginUser.dto";
import VerifyTokenDto from "../DataTransferObjects/User/verifyToken.dto";
import ForgotPasswordDto from "../DataTransferObjects/User/forgotPassword.dto";
import ResetPasswordDto from "../DataTransferObjects/User/resetPassword.dto";
import CheckUsernameDto from "../DataTransferObjects/User/checkUsername.dto";
import HttpException from "../Classes/HttpException";
import userModel from "../Models/user.model";
import { sendMailForNewPassword, sendVerificationMail } from "../Utils/mailer";

class AuthController implements Controller {
  public path = "/api/auth";
  public router = Router();
  public isProtected = false;

  private user = userModel;
  private readonly logger = logger.getNamedLogger("Controller [User]");

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginUserDto),
      this.login
    );
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.register
    );
    this.router.get(
      `${this.path}/verify`,
      validationMiddleware(VerifyTokenDto),
      this.verifyToken
    );
    this.router.post(
      `${this.path}/initiateResetPassword`,
      validationMiddleware(ForgotPasswordDto),
      this.initiateResetPassword
    );
    this.router.post(
      `${this.path}/resetPassword/:id`,
      validationMiddleware(ResetPasswordDto),
      this.resetPassword
    );
    this.router.post(
      `${this.path}/checkUsernameAvailability`,
      validationMiddleware(CheckUsernameDto),
      this.checkUsernameAvailability
    );
    this.router.post(`${this.path}/logout`, this.logOut);
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginUserDto = req.body;

    let oldUser = await this.user.findOne({ email: email });
    const isWebmail = /^[a-zA-Z0-9._%+-]+@nitt+\.edu$/.test(email);
    let returnUser: User;

    if (isWebmail) {
      try {
        let rollNumber = email.split("@")[0];

        // Authenticate with IMAP
        let imapResponse = await this.imapAuthenticate(rollNumber, password);
        if (oldUser == null) {
          // Register with IMAP
          let user = {
            email: email,
            password: "",
            username: rollNumber,
            mobileNumber: "",
            isVerified: true,
            verificationCode: "",
            passwordResetToken: "",
            lastUpdate: new Date(),
          };

          let newUser = await this.user.create(user);

          returnUser = newUser;
        } else {
          returnUser = oldUser;
        }

        const tokenData = this.createToken(returnUser);
        res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
        return res.status(200).jsonp({
          status: 200,
          success: true,
          msg: "User successfully logged in!",
        });
      } catch (err) {
        return next(
          new HttpException({
            status: 401,
            message: "Invalid webmail credentials!",
            logger: this.logger,
          })
        );
      }
    } else {
      if (oldUser == null) {
        // if user doesn't exist
        return next(
          new HttpException({
            status: 404,
            message: "User not found!",
            logger: this.logger,
          })
        );
      } else if (!oldUser.isVerified) {
        // if user isn't verified yet
        return next(
          new HttpException({
            status: 401,
            message: "Email not verified!",
            logger: this.logger,
          })
        );
      } else {
        let match = bcrypt.compare(password, oldUser.password);
        if (match) {
          // if passwords match
          const tokenData = this.createToken(oldUser);
          res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
          return res.status(200).jsonp({
            status: 200,
            success: true,
            msg: "User successfully logged in!",
          });
        } else {
          return next(
            new HttpException({
              status: 401,
              message: "Password is incorrect!",
              logger: this.logger,
            })
          );
        }
      }
    }
  };

  private checkUsernameAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username }: CheckUsernameDto = req.body;
    try {
      const reqUser = await this.user.findOne({ username: username });
      if (!reqUser) {
        return res.status(200).jsonp({
          status: 200,
          success: true,
          msg: "Username available!",
        });
      } else {
        return res.status(200).jsonp({
          status: 200,
          success: true,
          msg: "Username not available!",
        });
      }
    } catch (err) {
      return next(
        new HttpException({
          status: 500,
          message: "Internal Server Error!",
          logger: this.logger,
          err,
        })
      );
    }
  };

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = req.body;
    const isWebmail = /^[a-zA-Z0-9._%+-]+@nitt+\.edu$/.test(userData.email);

    if (isWebmail)
      return next(
        new HttpException({
          status: 401,
          message: "Webmail doesn't require registration",
          logger: this.logger,
        })
      );

    try {
      const dupEmail = await this.user.findOne({ email: userData.email });
      const dupUsername = await this.user.findOne({
        username: userData.username,
      });

      if (dupEmail) {
        return next(
          new HttpException({
            status: 409,
            message: "Email already exists!",
            logger: this.logger,
          })
        );
      }

      if (dupUsername) {
        return next(
          new HttpException({
            status: 409,
            message: "Username already exists!",
            logger: this.logger,
          })
        );
      }

      if (req.body.password != req.body.confirmPassword) {
        return next(
          new HttpException({
            status: 401,
            message: "Passwords don't match!",
            logger: this.logger,
          })
        );
      }

      req.body.password = await bcrypt.hash(
        req.body.password,
        config.get<number>("crypt.salt_rounds")
      );

      let newUser = await this.user.create({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        mobileNumber: req.body.mobileNumber,
        isVerified: false,
        verificationCode: await this.generateRandomString(10),
        passwordResetToken: "",
        lastUpdate: new Date(),
      });

      if (config.get<Boolean>("mail.enabled") == true) {
        if (config.get("mail.sendgrid_key") != "") {
          let mailerResponse = await sendVerificationMail(
            req.body.email,
            newUser.verificationCode
          );
        } else {
          next(
            new HttpException({
              status: 500,
              message: "Sendgrid Key not provided while mailing is enabled!",
              logger: this.logger,
            })
          );
        }
      } else {
        newUser.isVerified = true;
        await newUser.save();
      }

      const tokenData = this.createToken(newUser);
      res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
      return res.status(200).jsonp({
        status: 200,
        success: true,
        msg: "User successfully registered!",
      });
    } catch (err) {
      return next(
        new HttpException({
          status: 500,
          message: "Internal Server Error!",
          logger: this.logger,
          err,
        })
      );
    }
  };

  private initiateResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email }: ForgotPasswordDto = req.body;
      let isWebmail = /^[a-zA-Z0-9._%+-]+@nitt+\.edu$/.test(email);

      if (isWebmail) {
        return next(
          new HttpException({
            status: 400,
            message: "Webmail password can't be changed!",
            logger: this.logger,
          })
        );
      } else {
        let user = await this.user.findOne({ email: email });

        if (!user) {
          return next(
            new HttpException({
              status: 400,
              message: "Email not registered!",
              logger: this.logger,
            })
          );
        }

        let uniq_id = await this.generateRandomString(15);
        user.passwordResetToken = uniq_id;
        await user.save();
        await sendMailForNewPassword(email, uniq_id);

        return res.status(200).jsonp({
          status: 200,
          success: true,
          msg:
            "An email for resetting password link has been sent to your registered email!",
        });
      }
    } catch (err) {
      return next(
        new HttpException({
          status: 500,
          message: "Internal Server Error!",
          logger: this.logger,
          err,
        })
      );
    }
  };

  private resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { password, confirmPassword }: ResetPasswordDto = req.body;
    try {
      if (password == confirmPassword) {
        let newPassword = await bcrypt.hash(
          password,
          config.get<number>("crypt.salt_rounds")
        );
        let requestId = req.params.id;
        let requestedUser = await this.user.findOne({
          passwordResetToken: requestId,
        });
        if (requestedUser != null) {
          requestedUser.password = newPassword;
          requestedUser.passwordResetToken = "";
          await requestedUser.save();

          return res.status(200).jsonp({
            status: 200,
            success: true,
            msg: "Password successfully changed!",
          });
        } else {
          return next(
            new HttpException({
              status: 404,
              message: "User does not exist!",
              logger: this.logger,
            })
          );
        }
      } else {
        return next(
          new HttpException({
            status: 401,
            message: "Passwords don't match!",
            logger: this.logger,
          })
        );
      }
    } catch (err) {
      return next(
        new HttpException({
          status: 500,
          message: "Internal Server Error!",
          logger: this.logger,
          err,
        })
      );
    }
  };

  private verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, code }: VerifyTokenDto = req.query as {
        email: string;
        code: string;
      };

      let user = await this.user.findOne({
        email: email,
        verificationCode: code,
      });

      if (!user) {
        return next(
          new HttpException({
            status: 404,
            message: "User not found!",
            logger: this.logger,
          })
        );
      }

      user.isVerified = true;
      await user.save();

      return res.status(200).jsonp({
        status: 200,
        success: true,
        msg: "User successfully verified!",
      });
    } catch (err) {
      return next(
        new HttpException({
          status: 500,
          message: "Internal Server Error!",
          logger: this.logger,
          err,
        })
      );
    }
  };

  private logOut = (req: Request, res: Response) => {
    res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
    res.status(200).jsonp({
      status: 200,
      success: true,
      msg: "User successfully logged out!",
    });
  };

  // Helper Functions
  private generateRandomString = async (length: number) => {
    const randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  };

  private createToken(user: User): TokenData {
    const expiresIn = config.get<number>("crypt.token_expiry_period");
    const secret = config.get<string>("crypt.jwt_secret");
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private imapAuthenticate = async (username: string, password: string) => {
    let imap = new Imap({
      user: username,
      password: password,
      host: config.get<string>("imap.host"),
      port: config.get<number>("imap.port"),
      tls: false,
      authTimeout: 30000,
    });

    return new Promise((resolve, reject) => {
      imap.once("ready", () => {
        imap.end();
        resolve(true);
      });

      imap.once("error", (error: Error) => {
        reject(error);
      });

      imap.connect();
    });
  };
}

export default AuthController;
