import { getRepository } from "typeorm";
import { CodeReview as CodeReviewEntity } from "../entities/CodeReview";
import { HttpException } from "../exceptions/HttpException";
import { validateInsertCodeReview } from "../lib/validators/codeReview";
import { User } from "./user";

interface InsertData {
  title: string;
  code: string;
  description: string;
}

interface Options {
  offset?: number;
  limit?: number;
  orderBy?: "asc" | "desc";
}

const userSelect = User.select.map((select) => `user.${select}`);

export class CodeReview {
  static select = [
    "code_reviews.id",
    "code_reviews.code",
    "code_reviews.title",
    "code_reviews.description",
    "code_reviews.createdAt",
    "code_reviews.updatedAt",
    ...userSelect,
  ];
  static codeReviewRepository() {
    return getRepository(CodeReviewEntity);
  }

  static async insert(data: InsertData, userId: number, roomId: number) {
    await validateInsertCodeReview(data);
    const codeReview = await this.codeReviewRepository().insert({
      code: data.code,
      user: {
        id: userId,
      },
      room: {
        id: roomId,
      },
      description: data.description,
      title: data.title,
    });
    return {
      id: codeReview.identifiers[0].id,
    };
  }

  static async getAll(options?: Options) {
    const codeReviews = await this.codeReviewRepository()
      .createQueryBuilder("code_reviews")
      .leftJoinAndSelect("code_reviews.user", "user")
      .select(this.select)
      .limit(options?.limit || undefined)
      .skip(options?.offset || undefined)
      .orderBy(
        "code_reviews.createdAt",
        options?.orderBy === "asc" ? "ASC" : "DESC"
      )
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

  static async delete(id: number, userId: number) {
    const codeReview = await this.getOne(id);
    if (codeReview.user.id !== userId) {
      throw new HttpException("Unauthorized", 401);
    }
    return this.codeReviewRepository().delete(id);
  }
}
