import config from "config";
import BunyanLoggly from "bunyan-loggly";
import * as Logger from "bunyan";
import * as path from "path";

/**
 * LoggerFactory provides a generic logger instance which can be used to spawn child loggers for specific classes
 */
class LoggerFactory {
  protected logger: Logger;

  constructor() {
    const { serviceName, level } = config.get("logs");

    // Default logging has a rotating-file based logs with 7 day time period
    let streams: any[] = [
      {
        count: 7,
        level,
        path: path.resolve(__dirname, "..", "..", "logs", "logs.json"),
        period: "1d",
        type: "rotating-file",
      },
      {
        count: 7,
        level: Logger.ERROR,
        path: path.resolve(__dirname, "..", "..", "logs", "logs-error.json"),
        period: "1d",
        type: "rotating-file",
      },
    ];

    // If loggly config is provided then it is added to the streams
    if (config.has("logs.logglyToken") && config.has("logs.logglySubdomain")) {
      const { logglyToken, logglySubdomain } = config.get("logs");

      const loggly = new BunyanLoggly({
        token: logglyToken,
        subdomain: logglySubdomain,
      });

      streams.push({
        level,
        stream: loggly,
        type: "raw",
      });
    }

    const options: Logger.LoggerOptions = {
      name: serviceName,
      level: level as Logger.LogLevel,
      serializers: Logger.stdSerializers,
      streams
    };

    this.logger = Logger.createLogger(options);
  }

  /**
   * Gets a child instance of a logger with specific name
   */
  public getNamedLogger(loggerName: string): Logger {
    return this.logger.child({ loggerName });
  }
}

const logger = new LoggerFactory()

export default logger;
