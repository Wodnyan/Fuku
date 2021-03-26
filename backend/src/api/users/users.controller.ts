import { NextFunction, Request, Response } from "express";
import { User } from "../../controllers/user";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken, accessToken } = await User.register(req.body);
    res.cookie("refresh_token", refreshToken);
    res.status(201).json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
