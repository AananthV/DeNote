import derbyApp from './editor';
import initializeControllers from '../base/router';
import EditorController from './Controllers/editor.controller';

const baseUrl = '/editor';

const controllers = [
    EditorController
];

const expressRouter = initializeControllers(derbyApp, controllers);

export default {
    baseUrl,
    derbyApp,
    expressRouter
};
