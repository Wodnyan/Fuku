import { Request, Response, NextFunction } from "express";

export const postCodeReview = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(201).json({
    message: "Create Code Review",
  });
};
