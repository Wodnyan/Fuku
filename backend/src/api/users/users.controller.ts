import { NextFunction, Request, Response } from "express";
import { User } from "../../controllers/user";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken, accessToken } = await User.register(req.body);
    console.log(refreshToken, accessToken);
    res.json({
      message: "register",
    });
  } catch (error) {
    next(error);
  }
};
