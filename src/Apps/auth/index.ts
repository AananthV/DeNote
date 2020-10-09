import derbyApp from './auth';
import RegisterController from './Controllers/register.controller';
import initializeControllers from '../base/router';

const baseUrl = '/auth';

const controllers = [
    RegisterController
];

const expressRouter = initializeControllers(derbyApp, controllers);

export default {
    baseUrl,
    derbyApp,
    expressRouter
};
