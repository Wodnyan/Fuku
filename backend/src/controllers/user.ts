import { compare } from "bcrypt";
import { getRepository } from "typeorm";
import { User as UserEntity } from "../entities/User";
import { HttpException } from "../exceptions/HttpException";
import { hash } from "../lib/hash";
import { createAccessToken, createRefreshToken } from "../lib/jwt";
import {
  validateLoginCredentials,
  validateSignUpCredentials,
} from "../lib/validators/user";

interface Tokens {
  refreshToken: string;
  accessToken: string;
}

interface LoginCredentials {
  password: string;
  email: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}

export class User {
  static readonly select = [
    "username",
    "id",
    "createdAt",
    "updatedAt",
    "email",
    "avatarUrl",
  ] as (keyof UserEntity)[];

  static userRepository() {
    return getRepository(UserEntity);
  }

  public static async register(
    credentials: RegisterCredentials
  ): Promise<Tokens> {
    await validateSignUpCredentials(credentials);
    const uniqueEmail = await this.isEmailUnique(credentials.email);
    const uniqueUsername = await this.isUsernameUnique(credentials.username);
    if (!uniqueEmail) {
      throw new HttpException("Email is taken", 409);
    }
    if (!uniqueUsername) {
      throw new HttpException("Username is taken", 409);
    }
    const hashedPassword = await hash(credentials.password);
    credentials.password = hashedPassword;
    const user = await this.userRepository().save(credentials);
    const accessToken = await createAccessToken(user.id);
    const refreshToken = await createRefreshToken(user.id);
    return {
      accessToken,
      refreshToken,
    };
  }

  public static async login(credentials: LoginCredentials): Promise<Tokens> {
    await validateLoginCredentials(credentials);
    const isEmailUnique = await this.isEmailUnique(credentials.email);
    if (isEmailUnique) {
      throw new HttpException("Invalid credentials", 401);
    }
    const user = await this.userRepository().findOne({
      where: {
        email: credentials.email,
      },
    });
    const isPasswordCorrect = await compare(
      credentials.password,
      user?.password!
    );
    if (!isPasswordCorrect) {
      throw new HttpException("Invalid credentials", 401);
    }
    const accessToken = await createAccessToken(user!.id);
    const refreshToken = await createRefreshToken(user!.id);
    return {
      accessToken,
      refreshToken,
    };
  }

  public static async getOne(userId: number) {
    const user = await this.userRepository().findOne({
      where: {
        id: userId,
      },
      select: this.select,
    });
    return user;
  }

  public static async isUsernameUnique(username: string) {
    const user = await this.userRepository().findOne({
      where: {
        username,
      },
    });
    return user === undefined;
  }

  public static async isEmailUnique(email: string) {
    const user = await this.userRepository().findOne({
      where: {
        email,
      },
    });
    return user === undefined;
  }
}
