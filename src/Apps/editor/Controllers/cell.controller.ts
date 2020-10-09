import { Router, Request, Response, NextFunction } from 'express';

import HttpException from '../../base/Classes/HttpException';
import logger from '../../../Utils/logger';

import { IController } from "../../base/Interfaces";

class CellController implements IController {
    public path = "/cell";
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
        this.derbyApp.get(`${this.path}`, this.renderCell);
        this.derbyApp.get(`/section`, this.renderSection);
    }

    private renderCell = (page: any, model: any, params: any, next: any) => {
        // console.log(page);
        try {
            const cell = model.at('cell._1');
            model.subscribe(cell, function (err) {
                cell.createNull({ data: '', type: 'text' });
                return page.render('editor-cell'); 
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

    private renderSection = (page: any, model: any, params: any, next: any) => {
        // console.log(page);
        try {
            const section = model.at('section._6');
            model.subscribe(section, function (err) {
                section.createNull({
                        cells: [
                            { id: 1, width: 1, data: 'asdf', type: 'text' },
                            { id: 2, width: 1, data: 'asdfgh', type: 'text' },
                            { id: 3, width: 1, data: 'fdsa', type: 'text' }
                        ]
                });
                return page.render('editor-section'); 
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
}

export default CellController;