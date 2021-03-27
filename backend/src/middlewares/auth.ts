import { NextFunction, Request, Response } from "express";
import { User } from "../controllers/user";
import { HttpException } from "../exceptions/HttpException";
import { validateAccessToken } from "../lib/jwt";

// If user is authorized than add their credentials to the req object
export const checkAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { userId } = await validateAccessToken(token!);
    const user = await User.getOne(userId);
    req.user = user;
    next();
  } catch (_) {
    next();
  }
};

export const protectRoute = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    await validateAccessToken(token!);
    next();
  } catch (error) {
    const httpError = new HttpException("Invalid Credentials", 401);
    next(httpError);
  }
};
