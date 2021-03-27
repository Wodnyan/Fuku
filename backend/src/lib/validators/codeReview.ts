import { NextFunction, Request, Response } from "express";
import joi from "joi";
import { HttpException } from "../../exceptions/HttpException";

const insertCodeReviewSchema = joi.object({
  description: joi.string().required(),
  code: joi.string().required(),
});

const routeParamIdSchema = joi.object({
  codeReviewIdParam: joi.number().integer().positive(),
});

export const validateInsertCodeReview = async (payload: any) => {
  try {
    return await insertCodeReviewSchema.validateAsync(payload, {
      abortEarly: false,
    });
  } catch (error) {
    const errors = error.details.map((detail: any) => detail.message);
    throw new HttpException(error.name, 400, {
      errors,
    });
  }
};

export const validateRouteParamId = async (payload: any) => {
  try {
    return await routeParamIdSchema.validateAsync(payload, {
      abortEarly: false,
    });
  } catch (error) {
    const errors = error.details.map((detail: any) => detail.message);
    throw new HttpException(error.name, 400, {
      errors,
    });
  }
};

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
