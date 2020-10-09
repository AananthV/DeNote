import { IControllerConstructor } from "./Interfaces"
import { Router } from "express"

const initializeControllers = (derbyApp: any, controllers: IControllerConstructor[]): Router => {
    const router = Router();
    controllers.forEach((controller) => {
        const icontroller = new controller(derbyApp);
        router.use(icontroller.expressRouter);
    });
    return router;
}

export default initializeControllers;