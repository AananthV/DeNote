import derbyApp from './editor';
import CellController from './Controllers/cell.controller';
import initializeControllers from '../base/router';
import loadStyles from '../base/loadStyles';

const baseUrl = '/editor';

const controllers = [
    CellController
];

const expressRouter = initializeControllers(derbyApp, controllers);

export default {
    baseUrl,
    derbyApp,
    expressRouter
};
