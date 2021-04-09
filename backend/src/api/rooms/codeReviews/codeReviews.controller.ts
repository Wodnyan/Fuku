import { Request, Response, NextFunction } from "express";
import { CodeReview } from "../../../controllers/codeReview";
import { CustomRequestUser } from "../../../types";

interface CodeReviewQueryParams {
  limit?: number;
  offset?: number;
  orderBy?: "asc" | "desc";
}

export const postCodeReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as CustomRequestUser;
    const { roomId } = req.params;
    const newCodeReview = await CodeReview.insert(req.body, id, Number(roomId));
    // TODO: Query the new code review
    const codeReview = await CodeReview.getOne(newCodeReview.id);
    res.status(201).json({
      codeReview,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCodeReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, offset, orderBy } = req.query as CodeReviewQueryParams;
    const codeReviews = await CodeReview.getAll({
      limit,
      offset,
      orderBy,
    });
    res.json({
      codeReviews,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getOneCodeReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { codeReviewId } = req.params;
    const codeReview = await CodeReview.getOne(Number(codeReviewId));
    res.json({
      codeReview,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCodeReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { codeReviewId } = req.params;
    const { id: userId } = req.user as CustomRequestUser;
    await CodeReview.delete(Number(codeReviewId), userId);
    res.status(204).json({
      message: "No content",
    });
  } catch (error) {
    next(error);
  }
};
