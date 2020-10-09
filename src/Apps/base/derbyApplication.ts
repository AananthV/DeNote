import derby from "derby";
import { Router } from "express";
// import racerSchema from "racer-schema";

import prefixModels from "./Utils/prefixedModels.util";

import { IController } from "./Interfaces";

class DerbyApplication {
    public derbyApp: any;
    public expressRouter: Router;
    public name: string;
    private prefix: string;
    private baseUrl: string;
    private models: any;
    private controllers: any[];
    private components: any[];

    constructor(
        derbyApp: any,
        name: string,
        prefix: string,
        baseUrl: string,
        models: any,
        controllers: any[],
        components: any[],
        // backend: any
    ) {
        this.derbyApp = derbyApp;
        this.name = name;
        this.prefix = prefix;
        this.baseUrl = baseUrl;
        this.models = prefixModels(prefix, models);
        this.controllers = controllers;
        this.components = components;
        // this.derbyApp.backend = backend

        // derby.use(require('racer-schema'), this.models);

        // this.derbyApp.use(require('racer-schema'), this.models);
        // console.log(require('racer-schema'));

        this.initialiseComponents();
    }

    private initialiseControllers() {
        this.expressRouter = Router();
        this.controllers.forEach((controller) => {
            const icontroller = new controller(this.derbyApp);
            this.expressRouter.use(icontroller.expressRouter);
        });
    }

    private initialiseComponents() {
        this.components.forEach(component => {
            this.derbyApp.component(component);
        })
    }
}

export default DerbyApplication;
