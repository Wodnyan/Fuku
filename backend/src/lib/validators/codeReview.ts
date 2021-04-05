import { NextFunction, Request, Response } from "express";
import joi from "joi";
import { validateSchemaAsync } from "./validator";

const insertCodeReviewSchema = joi.object({
  title: joi.string().max(150).required(),
  description: joi.string().max(5000).required(),
  code: joi.string().required(),
});

const routeParamIdSchema = joi.object({
  codeReviewIdParam: joi.number().integer().positive(),
});

export const validateInsertCodeReview = async (payload: any) =>
  await validateSchemaAsync(insertCodeReviewSchema, payload);

export const validateRouteParamId = async (payload: any) =>
  await validateSchemaAsync(routeParamIdSchema, payload);

export const validateCodeReviewRouteParamIdMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await validateRouteParamId({
      codeReviewIdParam: req.params.codeReviewId,
    });
    next();
  } catch (error) {
    next(error);
  }
};
