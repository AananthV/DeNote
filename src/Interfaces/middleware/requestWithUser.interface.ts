import { Request } from "express";
import User from "../model/user.interface";

interface RequestWithUser extends Request {
  user: User;
}

const isRequestWithUser = (req: Request | RequestWithUser): req is RequestWithUser => {
  return !!req['user'];
}

export { RequestWithUser, isRequestWithUser };
