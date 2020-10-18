import { Router, Request, Response, NextFunction } from 'express';

import HttpException from '../../base/Classes/HttpException';
import logger from '../../../Utils/logger';

import { IController } from "../../base/Interfaces";

class EditorController implements IController {
    public path = "/editor";
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
        this.derbyApp.get(`${this.path}/:note_id`, this.renderEditor);
    }

    private renderEditor = (page: any, model: any, params: any, next: any) => {
        try {
            const note_id = params.note_id;
            const note = model.at(`notes.${note_id}`);
            model.subscribe(note, function (err) {
                note.createNull({
                    sections: [
                        {
                            cells: [
                                { id: 1, width: 1, data: 'asdf', type: 'text' },
                                { id: 2, width: 1, data: 'asdfgh', type: 'text' },
                                { id: 3, width: 1, data: 'fdsa', type: 'text' }
                            ]
                        },
                        {
                            cells: [
                                { id: 1, width: 1, data: 'asdf', type: 'text' },
                                { id: 2, width: 1, data: 'asdfgh', type: 'text' },
                                { id: 3, width: 1, data: 'fdsa', type: 'text' }
                            ]
                        }
                    ]
                });
                
                model.set('_page.note_id', note_id);
                return page.render('editor:split-editor'); 
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

export default EditorController;