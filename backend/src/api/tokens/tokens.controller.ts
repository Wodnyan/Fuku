import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../exceptions/HttpException";
import { createAccessToken, validateRefreshToken } from "../../lib/jwt";

export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw new HttpException("Invalid Credentials", 400);
    }
    const { userId } = await validateRefreshToken(refreshToken);
    const accessToken = await createAccessToken(userId);
    res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}
