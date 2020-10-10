import Logger from "bunyan";

interface AppInitialiser {
  baseUrl: string;
  apps: any[];
  dbUrl: string;
  logger: Logger;
  port: number;
  sessionSecret: string;
}

export default AppInitialiser;
