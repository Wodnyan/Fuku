import joi from "joi";
import { HttpException } from "../../exceptions/HttpException";

const loginSchema = joi.object({
  email: joi.string().email().max(320).required(),
  password: joi.string().max(120).required(),
});

const signUpSchema = joi.object({
  username: joi.string().max(100).required(),
  email: joi.string().email().max(320).required(),
  password: joi.string().max(120).required(),
});

export const validateSignUpCredentials = async (credentials: any) => {
  try {
    return await signUpSchema.validateAsync(credentials, {
      abortEarly: false,
    });
  } catch (error) {
    const errors = error.details.map((detail: any) => detail.message);
    throw new HttpException(error.name, 400, {
      errors,
    });
  }
};

export const validateLoginCredentials = async (credentials: any) => {
  try {
    return await loginSchema.validateAsync(credentials, {
      abortEarly: false,
    });
  } catch (error) {
    const errors = error.details.map((detail: any) => detail.message);
    throw new HttpException(error.name, 400, {
      errors,
    });
  }
};
