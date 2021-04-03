import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpException } from "../../exceptions/HttpException";

const routeParamIdSchema = Joi.object({
  roomIdParam: Joi.number().integer(),
});

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

export const validateRoomParamIdMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await validateRouteParamId({
      roomIdParam: req.params.roomId,
    });
    next();
  } catch (error) {
    next(error);
  }
};
