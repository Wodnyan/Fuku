import { getRepository } from "typeorm";
import { CodeReview as CodeReviewEntity } from "../entities/CodeReview";
import { HttpException } from "../exceptions/HttpException";
import { validateInsertCodeReview } from "../lib/validators/codeReview";
import { User } from "./user";

interface InsertData {
  code: string;
  description: string;
}

const userSelect = User.select.map((select) => `user.${select}`);

export class CodeReview {
  static select = [
    "code_reviews.id",
    "code_reviews.code",
    "code_reviews.description",
    "code_reviews.createdAt",
    "code_reviews.updatedAt",
    ...userSelect,
  ];
  static codeReviewRepository() {
    return getRepository(CodeReviewEntity);
  }

  static async insert(data: InsertData, userId: number) {
    await validateInsertCodeReview(data);
    const codeReview = await this.codeReviewRepository().insert({
      code: data.code,
      user: {
        id: userId,
      },
      description: data.description,
    });
    return codeReview;
  }

  static async getAll() {
    const codeReviews = await this.codeReviewRepository()
      .createQueryBuilder("code_reviews")
      .leftJoinAndSelect("code_reviews.user", "user")
      .select(this.select)
      .getMany();
    return codeReviews;
  }

  static async getOne(id: number) {
    const codeReview = await this.codeReviewRepository()
      .createQueryBuilder("code_reviews")
      .where({
        id,
      })
      .leftJoinAndSelect("code_reviews.user", "user")
      .select(this.select)
      .getOne();
    if (!codeReview) {
      throw new HttpException("No Code Review Found", 404);
    }
    return codeReview;
  }

  static async delete() {
    return "Hello world";
  }

  static async update() {
    return "Hello world";
  }
}
