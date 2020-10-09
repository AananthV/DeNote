import { Router, static as Static } from "express";

const loadStyles = (derbyApp: any, expressRouter: Router, path: string) => {
    derbyApp.loadStyles(path);
    expressRouter.use(Static(path));
}

export default loadStyles;