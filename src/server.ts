import derby from 'derby';

import config from "config";
import App from "./app";
import logger from "./Utils/logger";

import Auth from './Apps/auth';
import Editor from './Apps/editor';

derby.run(() => {
  const app = new App({
    baseUrl: config.get("server.proxy"),
    apps: [Auth, Editor],
    dbUrl: config.get("db.url"),
    logger: logger.getNamedLogger("App"),
    port: config.get("server.port"),
    sessionSecret: config.get("session.secret")
  });
  app.listen();
});
