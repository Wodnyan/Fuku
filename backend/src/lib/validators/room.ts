import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateSchemaAsync } from "./validator";

const routeParamIdSchema = Joi.object({
  roomIdParam: Joi.number().integer(),
});

const insertRoomSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(5000).required(),
  icon: Joi.string().max(2000),
});

const updateRoomSchema = Joi.object({
  description: Joi.string().max(5000),
  icon: Joi.string().max(2000),
});

const queryParamSchema = Joi.object({
  name: Joi.string(),
  limit: Joi.number().integer(),
  skip: Joi.number().integer(),
  orderBy: Joi.string().lowercase().equal("asc", "desc"),
});

export const validateUpdateRoom = async (payload: any) => {
  return await validateSchemaAsync(updateRoomSchema, payload);
};

export const validateInsertRoom = async (payload: any) => {
  return await validateSchemaAsync(insertRoomSchema, payload);
};

export const validateRouteParamId = async (payload: any) => {
  return await validateSchemaAsync(routeParamIdSchema, payload);
};

export const validateGetAllRoomsQueryParams = async (payload: any) => {
  return await validateSchemaAsync(queryParamSchema, payload);
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
