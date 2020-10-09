import { Request } from "express";
import User from "../model/user.interface";

declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
    }
}
