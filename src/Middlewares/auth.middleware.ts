import { NextFunction, Request, Response } from "express";
import config from "config";
import * as jwt from "jsonwebtoken";
import DataStoredInToken from "../Interfaces/controller/auth/dataStoredInToken.interface";
import userModel from "../Models/user.model";

import HttpException from "../Classes/HttpException";
import logger from "../Utils/logger";

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = config.get<string>("crypt.jwt_secret");
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(
          new HttpException({
            status: 400,
            message: "Wrong Auth Token!",
            logger: logger.getNamedLogger("Middleware [auth]"),
          })
        );
      }
    } catch (error) {
      next(
        new HttpException({
          status: 400,
          message: "Wrong Auth Token!",
          logger: logger.getNamedLogger("Middleware [auth]"),
        })
      );
    }
  } else {
    next(
      new HttpException({
        status: 400,
        message: "Auth Token Missing!",
        logger: logger.getNamedLogger("Middleware [validation]"),
      })
    );
  }
}

export default authMiddleware;
