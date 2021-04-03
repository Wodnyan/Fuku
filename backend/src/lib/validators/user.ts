import joi from "joi";
import { validateSchemaAsync } from "./validator";

const loginSchema = joi.object({
  email: joi.string().email().max(320).required(),
  password: joi.string().max(120).required(),
});

const signUpSchema = joi.object({
  username: joi.string().max(100).required(),
  email: joi.string().email().max(320).required(),
  password: joi.string().max(120).required(),
});

export const validateSignUpCredentials = async (credentials: any) =>
  await validateSchemaAsync(signUpSchema, credentials);

export const validateLoginCredentials = async (credentials: any) =>
  await validateSchemaAsync(loginSchema, credentials);
