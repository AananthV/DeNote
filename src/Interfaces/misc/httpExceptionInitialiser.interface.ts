import Logger from "bunyan";

interface HttpExceptionInitialiser{
  status: number;
  message: string;
  logger: Logger;
  err?: Error;
}

export default HttpExceptionInitialiser;