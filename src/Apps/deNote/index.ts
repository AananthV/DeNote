import derbyApp from './deNote';
import initializeControllers from '../base/router';
import EditorController from './Controllers/editor.controller';
import DashboardController from './Controllers/dashboard.controller';

const baseUrl = '';

const controllers = [
    EditorController,
    DashboardController
];

const expressRouter = initializeControllers(derbyApp, controllers);

export default {
    baseUrl,
    derbyApp,
    expressRouter
};
