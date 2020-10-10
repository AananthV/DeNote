import derby from "derby";
import racerBundle from "racer-bundle";
import derbyDebug from "derby-debug";
import highway from "racer-highway";
import tsify from 'tsify';
import express, { Application, Router } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as Logger from "bunyan";
import ShareDbMongo from "sharedb-mongo";

import errorMiddleware from "./Middlewares/error.middleware";
import AppInitialiser from "./Interfaces/misc/appInitialiser.interface";

derby.use(racerBundle);

class App {
    public app: Application;
    private derbyApps: any[] = [];
    private backend: any;
    private handlers: any;
    private store: MongoStore.MongoStore;
    private sessionSecret: string;
    private port: number;
    private baseUrl: string;
    private readonly logger: Logger;

    constructor({
        baseUrl,
        apps,
        dbUrl,
        logger,
        port,
        sessionSecret,
    }: AppInitialiser) {
        this.app = express();

        this.port = port;
        this.baseUrl = baseUrl;
        this.logger = logger;
        this.sessionSecret = sessionSecret;

        this.connectToDatabase(dbUrl);
        this.initialiseMiddlewares();
        this.initialiseApps(apps);
        this.initialiseErrorHandlerMiddleware();
        this.pushApps();
    }

    private connectToDatabase(dbUrl: string) {
        const db = new ShareDbMongo(dbUrl);
        // this.backend = racer.createBackend({db});
        this.backend = derby.createBackend({
            db: new ShareDbMongo(dbUrl),
        });

        this.handlers = highway(this.backend);

        const mongoStore = MongoStore(session);
        this.store = new mongoStore({ url: dbUrl });
    }

    private initialiseMiddlewares() {
        // // Body Parser
        // this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(cookieParser());

        // Support for typescript
        this.backend.on('bundle', (browserify) => {
            browserify.plugin(tsify);
        });

        // Adds req.model
        this.app.use(this.backend.modelMiddleware());

        // Sessions
        this.app.use(
            session({
                secret: this.sessionSecret,
                store: this.store,
                resave: true,
                saveUninitialized: true,
            })
        );

        // Handlers
        this.app.use(this.handlers.middleware);

        // Static Files
        this.app.use(
            express.static(path.join(__dirname, "..", "public"))
        );

        // Request Logging
        this.app.use((req, res, next) => {
            this.logger.info(`${req.method} ${req.path}`);
            next();
        });
    }

    private initialiseApps(apps: any[]) {
        // console.log(apps);
		apps.forEach(app => {
            this.derbyApps.push(app);
			this.app.use(`${this.baseUrl}${app.baseUrl}`, app.expressRouter);
            this.app.use(`${this.baseUrl}${app.baseUrl}`, app.derbyApp.router());
        });
    }

    public pushApps() {
        this.derbyApps.forEach(app => {
            app.derbyApp.writeScripts(this.backend, path.join(__dirname, "..", "public"), {}, (err) => {
                if (err) console.log(err);
            });
        })
    }

    private initialiseErrorHandlerMiddleware() {
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.app.on('upgrade', this.handlers.upgrade);
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
export default App;
