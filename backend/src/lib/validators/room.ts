import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateSchemaAsync } from "./validator";

const routeParamIdSchema = Joi.object({
  roomIdParam: Joi.number().integer(),
});

export const validateRouteParamId = async (payload: any) => {
  return await validateSchemaAsync(routeParamIdSchema, payload);
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
