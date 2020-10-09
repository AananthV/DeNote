import { Router, Request, Response, NextFunction } from 'express';

import HttpException from '../../base/Classes/HttpException';
import logger from '../../../Utils/logger';

import { IController } from "../../base/Interfaces";

class RegisterController implements IController {
    public path = "/register";
    public expressRouter = Router();
    public derbyApp: any;
    public isProtected = false;

    private readonly logger = logger.getNamedLogger("App [Auth] Controller [Register]");

    constructor(derbyApp: any) {
        this.derbyApp = derbyApp;
        this.initialiseExpressRoutes();
        this.initialiseDerbyRoutes();
    }

    private initialiseExpressRoutes() {
        this.expressRouter.post(`${this.path}`, this.registerUser);
    }

    private initialiseDerbyRoutes() {
        this.derbyApp.get(`${this.path}`, this.getRegisterComponent);
    }

    private getRegisterComponent = (page: any, model: any, params: any, next: any) => {
        // console.log(page);
        try {
            const value = model.at('random.value');
            model.fetch(value, function (err) {
                value.createNull(0);
                return page.render('auth-register'); 
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

    private registerUser = (req: Request, res: Response, next: NextFunction) => {
        return res.send('ksdajsdkasd');
    }
}

export default RegisterController;