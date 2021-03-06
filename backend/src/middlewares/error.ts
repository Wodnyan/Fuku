import { NextFunction, Request, Response } from "express";
import { __prod__ } from "../constants";
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
  let statusCode = error.status || 500;
  console.log(error);
  if (!error.isHttpException) {
    error.message = "Something went wrong";
    statusCode = 500;
  }
  res.status(statusCode).json({
    message: error.message,
    status: statusCode,
    errors: error.options?.errors,
    stack: __prod__ ? undefined : error.stack,
  });
};
