import joi from "joi";
import { HttpException } from "../../exceptions/HttpException";

const insertCodeReviewSchema = joi.object({
  description: joi.string().required(),
  code: joi.string().required(),
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
