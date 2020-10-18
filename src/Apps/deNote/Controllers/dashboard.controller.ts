import { Router, Request, Response, NextFunction } from 'express';

import HttpException from '../../base/Classes/HttpException';
import logger from '../../../Utils/logger';

import { IController } from "../../base/Interfaces";

class DashboardController implements IController {
    public path = "/dashboard";
    public expressRouter = Router();
    public derbyApp: any;
    public isProtected = false;

    private readonly logger = logger.getNamedLogger("App [Auth] Controller [Cell]");

    constructor(derbyApp: any) {
        this.derbyApp = derbyApp;
        this.initialiseExpressRoutes();
        this.initialiseDerbyRoutes();
    }

    private initialiseExpressRoutes() {}

    private initialiseDerbyRoutes() {
        this.derbyApp.get(`${this.path}`, this.getNotebooks);
        this.derbyApp.get(`${this.path}`, this.renderDashboard);
        // 
    }

    private getNotebooks = (page: any, model: any, params: any, next: any) => {
        try {
            // TODO: Auth
            const notebookList = model.query('notebooks', {});

            model.subscribe(notebookList, (err: Error) => {
                if (err) throw err;

                next();
            });
        } catch (err) {
            console.log(err);
            return next(new HttpException({
                status: 500,
                message: "Internal server error",
                logger: this.logger,
                err
            }));
        }
    }

    private renderDashboard = (page: any, model: any, params: any, next: any) => {
        try {
            page.render('dashboard');
        } catch (err) {
            console.log(err);
            return next(new HttpException({
                status: 500,
                message: "Internal server error",
                logger: this.logger,
                err
            }));
        }
    }
}

export default DashboardController;