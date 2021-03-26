import { NextFunction, Request, Response } from "express";
import { User } from "../../controllers/user";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken, accessToken } = await User.register(req.body);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
    });
    res.status(201).json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, refreshToken } = await User.login(req.body);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
    });
    res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
