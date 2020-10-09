import { Router } from "express";

export interface IController {
  path: string;
  expressRouter: Router;
  derbyApp: any;
  isProtected: boolean;
};

export interface IControllerConstructor {
  new (any): IController
}