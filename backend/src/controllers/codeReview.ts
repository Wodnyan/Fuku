import { getRepository } from "typeorm";
import { CodeReview as CodeReviewEntity } from "../entities/CodeReview";

interface InsertData {
  userId: number;
  code: string;
  description: string;
}

export class CodeReview {
  static codeReviewRepository() {
    return getRepository(CodeReviewEntity);
  }

  static async insert(data: InsertData) {
    const newCodeReview = this.codeReviewRepository().insert({
      code: data.code,
      user: {
        id: data.userId,
      },
      description: data.description,
    });
    console.log(newCodeReview);
    return "Hello world";
  }

  static async getAll() {
    return "Hello world";
  }

  static async getOne() {
    return "Hello world";
  }

  static async delete() {
    return "Hello world";
  }

  static async update() {
    return "Hello world";
  }
}
