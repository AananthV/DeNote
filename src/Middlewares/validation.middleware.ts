import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as express from "express";
import HttpException from "../Classes/HttpException";
import logger from "../Utils/logger";

function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false
): express.RequestHandler {
  return (req, res, next) => {
    let data = req.body;
    // validate get params request if available
    if (Object.keys(req.query).length > 0) data = req.query;

    validate(plainToClass(type, data), {
      skipMissingProperties,
      forbidUnknownValues: true,
      whitelist: true,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        //TODO: why the error in the next line
        const message = errors
          //@ts-ignore
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(", ");
        next(
          new HttpException({
            status: 400,
            message,
            logger: logger.getNamedLogger("Middleware [validation]"),
          })
        );
      } else {
        next();
      }
    });
  };
}

export default validationMiddleware;
