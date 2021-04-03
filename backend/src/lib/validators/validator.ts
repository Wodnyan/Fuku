import { ObjectSchema } from "joi";
import { HttpException } from "../../exceptions/HttpException";

export const validateSchemaAsync = async (
  schema: ObjectSchema,
  payload: object
) => {
  try {
    return await schema.validateAsync(payload, {
      abortEarly: false,
    });
  } catch (error) {
    const errors = error.details.map((detail: any) => detail.message);
    throw new HttpException(error.name, 400, {
      errors,
    });
  }
};
