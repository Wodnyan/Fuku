import { Request, Response, NextFunction } from "express";
import { CodeReview } from "../../controllers/codeReview";
import { CustomRequestUser } from "../../types";

export const postCodeReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as CustomRequestUser;
    const newCodeReview = await CodeReview.insert(req.body, id);
    // TODO: Query the new code review
    res.status(201).json({
      codeReview: newCodeReview,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCodeReviews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const codeReviews = await CodeReview.getAll();
    res.json({
      codeReviews,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
