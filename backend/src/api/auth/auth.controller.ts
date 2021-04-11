import { NextFunction, Request, Response } from "express";
import { User } from "../../controllers/user";
import { CustomRequestUser } from "../../types";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as CustomRequestUser;
    const user = await User.getOne(id);
    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refresh_token.split(" ")[1];
    await User.logout(token);
    res.status(204);
  } catch (error) {
    next(error);
  }
};

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
