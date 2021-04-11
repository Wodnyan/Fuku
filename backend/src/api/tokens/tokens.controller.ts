import { NextFunction, Request, Response } from "express";
import { BlackListedRefreshTokenController } from "../../controllers/blacklistedRefreshToken";
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
    const isBlackListed = await BlackListedRefreshTokenController.isBlacklisted(
      refreshToken
    );
    if (isBlackListed) {
      throw new HttpException("The provided token is blacklisted", 403);
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

export async function blacklistRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.body;
    await BlackListedRefreshTokenController.blackList(token);
    res.status(201).json({
      message: "Blacklisted",
    });
  } catch (error) {
    next(error);
  }
}
