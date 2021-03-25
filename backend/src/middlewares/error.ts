import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";

export const notFound = (req: Request, _: Response, next: NextFunction) => {
  const errorMessage = `Not Found - ${req.url}`;
  const error = new HttpException(errorMessage, 404);
  next(error);
};

export const errorHandler = (
  error: HttpException,
  _: Request,
  res: Response,
  _1: NextFunction
) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
};
