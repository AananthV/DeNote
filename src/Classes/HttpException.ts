import HttpExceptionInitialiser from "../Interfaces/misc/httpExceptionInitialiser.interface";
import Logger from "bunyan";

class HttpException extends Error {
  status: number;
  message: string;
  logger: Logger;
  err?: Error;

  constructor({ status, message, logger, err }: HttpExceptionInitialiser) {
    super(message);
    this.status = status;
    this.message = message;
    this.err = err;
    this.logger = logger;
  }
}

export default HttpException;
