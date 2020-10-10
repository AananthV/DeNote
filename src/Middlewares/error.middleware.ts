import { NextFunction, Request, Response } from "express";
import HttpException from "../Apps/base/Classes/HttpException";

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(error);
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  let err = null;

  if (typeof error.err != "undefined") {
    err = error.err;
  }

  error.logger.error(
    `${request.method} ${request.path} | Status:${status} Message:${message}`,
    err
  );

  return response.status(status).jsonp({
    status,
    message,
  });
}

export default errorMiddleware;
