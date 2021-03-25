import { getRepository } from "typeorm";
import { User as UserEntity } from "../entities/User";
import { HttpException } from "../exceptions/HttpException";

interface Tokens {
  refreshToken: string;
  accessToken: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}

export class User {
  static userRepository() {
    return getRepository(UserEntity);
  }

  public static async register(
    credentials: RegisterCredentials
  ): Promise<Tokens> {
    const uniqueEmail = await User.isEmailUnique(credentials.email);
    const uniqueUsername = await User.isUsernameUnique(credentials.username);
    if (!uniqueEmail) {
      throw new HttpException("Email is taken", 409);
    }
    if (!uniqueUsername) {
      throw new HttpException("Username is taken", 409);
    }
    const user = await User.userRepository().save(credentials);
    console.log(user);
    // TODO: Create refresh and access tokens
    return {
      accessToken: "fjklsajflka",
      refreshToken: "fjaslfjalksf",
    };
  }

  public static async isUsernameUnique(username: string) {
    const user = await User.userRepository().findOne({
      where: {
        username,
      },
    });
    return user === null;
  }

  public static async isEmailUnique(email: string) {
    const user = await User.userRepository().findOne({
      where: {
        email,
      },
    });
    return user === null;
  }
}
