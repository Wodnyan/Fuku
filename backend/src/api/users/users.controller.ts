import { NextFunction, Request, Response } from "express";
import { User } from "../../controllers/user";

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await User.getOne(Number(userId));
    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
};
