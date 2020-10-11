import { Router, Request, Response, NextFunction } from 'express';

import HttpException from '../../base/Classes/HttpException';
import logger from '../../../Utils/logger';

import { IController } from "../../base/Interfaces";

class EditorController implements IController {
    public path = "";
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
        // this.derbyApp.get(`/cell`, this.renderCell);
        // this.derbyApp.get(`/edit_cell`, this.editCell);
        // this.derbyApp.get(`/section`, this.renderSection);
        // this.derbyApp.get(`/edit_section`, this.editSection);
        // this.derbyApp.get(`/note`, this.renderNote);
        // this.derbyApp.get(`/edit_note`, this.editNote);
        this.derbyApp.get('/editor', this.renderEditor);
    }

    // private renderCell = (page: any, model: any, params: any, next: any) => {
    //     // console.log(page);
    //     try {
    //         const cell = model.at('cell._2');
    //         model.subscribe(cell, function (err) {
    //             cell.createNull({ width: 1, data: '', type: 'text' });
    //             return page.render('editor:render-cell'); 
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         return next(new HttpException({
    //             status: 500,
    //             message: "Internal server error",
    //             logger: this.logger,
    //             err
    //         }));
    //     }
    // }

    // private editCell = (page: any, model: any, params: any, next: any) => {
    //     // console.log(page);
    //     try {
    //         const cell = model.at('cell._2');
    //         model.subscribe(cell, function (err) {
    //             cell.createNull({ width: 1, data: '', type: 'text' });
    //             return page.render('editor:edit-cell'); 
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         return next(new HttpException({
    //             status: 500,
    //             message: "Internal server error",
    //             logger: this.logger,
    //             err
    //         }));
    //     }
    // }

    // private renderSection = (page: any, model: any, params: any, next: any) => {
    //     // console.log(page);
    //     try {
    //         const section = model.at('section._6');
    //         model.subscribe(section, function (err) {
    //             section.createNull({
    //                     cells: [
    //                         { id: 1, width: 1, data: 'asdf', type: 'text' },
    //                         { id: 2, width: 1, data: 'asdfgh', type: 'text' },
    //                         { id: 3, width: 1, data: 'fdsa', type: 'text' }
    //                     ]
    //             });
    //             return page.render('editor:render-section'); 
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         return next(new HttpException({
    //             status: 500,
    //             message: "Internal server error",
    //             logger: this.logger,
    //             err
    //         }));
    //     }
    // }

    // private editSection = (page: any, model: any, params: any, next: any) => {
    //     // console.log(page);
    //     try {
    //         const section = model.at('section._6');
    //         model.subscribe(section, function (err) {
    //             section.createNull({
    //                     cells: [
    //                         { id: 1, width: 1, data: 'asdf', type: 'text' },
    //                         { id: 2, width: 1, data: 'asdfgh', type: 'text' },
    //                         { id: 3, width: 1, data: 'fdsa', type: 'text' }
    //                     ]
    //             });
    //             return page.render('editor:edit-section'); 
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         return next(new HttpException({
    //             status: 500,
    //             message: "Internal server error",
    //             logger: this.logger,
    //             err
    //         }));
    //     }
    // }

    // private renderNote = (page: any, model: any, params: any, next: any) => {
    //     try {
    //         const note = model.at('note._3');
    //         model.subscribe(note, function (err) {
    //             note.createNull({
    //                 sections: [
    //                     {
    //                         cells: [
    //                             { id: 1, width: 1, data: 'asdf', type: 'text' },
    //                             { id: 2, width: 1, data: 'asdfgh', type: 'text' },
    //                             { id: 3, width: 1, data: 'fdsa', type: 'text' }
    //                         ]
    //                     },
    //                     {
    //                         cells: [
    //                             { id: 1, width: 1, data: 'asdf', type: 'text' },
    //                             { id: 2, width: 1, data: 'asdfgh', type: 'text' },
    //                             { id: 3, width: 1, data: 'fdsa', type: 'text' }
    //                         ]
    //                     }
    //                 ]
    //             });
    //             return page.render('editor:render-note'); 
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         return next(new HttpException({
    //             status: 500,
    //             message: "Internal server error",
    //             logger: this.logger,
    //             err
    //         }));
    //     }
    // }

    // private editNote = (page: any, model: any, params: any, next: any) => {
    //     try {
    //         const note = model.at('note._3');
    //         model.subscribe(note, function (err) {
    //             note.createNull({
    //                 sections: [
    //                     {
    //                         cells: [
    //                             { id: 1, width: 1, data: 'asdf', type: 'text' },
    //                             { id: 2, width: 1, data: 'asdfgh', type: 'text' },
    //                             { id: 3, width: 1, data: 'fdsa', type: 'text' }
    //                         ]
    //                     },
    //                     {
    //                         cells: [
    //                             { id: 1, width: 1, data: 'asdf', type: 'text' },
    //                             { id: 2, width: 1, data: 'asdfgh', type: 'text' },
    //                             { id: 3, width: 1, data: 'fdsa', type: 'text' }
    //                         ]
    //                     }
    //                 ]
    //             });
    //             return page.render('editor:edit-note'); 
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         return next(new HttpException({
    //             status: 500,
    //             message: "Internal server error",
    //             logger: this.logger,
    //             err
    //         }));
    //     }
    // }

    private renderEditor = (page: any, model: any, params: any, next: any) => {
        try {
            const note = model.at('note._3');
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
                return page.render('editor:editor'); 
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