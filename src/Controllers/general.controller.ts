import { Router, Request, Response, NextFunction } from "express";
import logger from "../Utils/logger";

import Controller from "../Interfaces/controller/controller.interface";
import { isRequestWithUser } from "../Interfaces/middleware/requestWithUser.interface";
import HttpException from "../Classes/HttpException";

class GeneralController implements Controller {
  // Absolute path of the Controller.
  public path = "";

  // Express router for the controller.
  public router = Router();

  // Set to true if Controller requires Authentication.
  public isProtected = true;

  private readonly logger = logger.getNamedLogger("Controller [General]");

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.get(`${this.path}/status`, this.getStatus);
    this.router.get(`${this.path}/user`, this.getUser);
  }

  private getStatus = (req: Request, res: Response, next: NextFunction) => {
    // try{
    //   throw new Error("XD");
    // } catch(err){
    //   return next(new HttpException({status: 500, message:`Internal Server error!`, logger: this.logger, err})); // Example for exceptions
    // }
    return res
      .status(200)
      .jsonp({ status: 200, success: true, message: "Api is running !" });
  };

  private getUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user property exists in Req.
      // This type-guard is required for typescript to allow access of req.user
      if (!isRequestWithUser(req)) {
        throw new Error("Request does not contain 'user' property.");
      }

      return res
        .status(200)
        .jsonp({ status: 200, success: true, message: req.user });
    } catch (err) {
      return next(new HttpException({status: 500, message:`Internal Server error!`, logger: this.logger, err}));
    }
  }
}

export default GeneralController;
