import { Router } from "express";

interface Controller {
  path: string;
  router: Router;
  isProtected: boolean;
}

export default Controller;
