import { getRepository } from "typeorm";
import { BlacklistedRefreshToken } from "../entities/BlacklistedRefreshToken";

export class BlackListedRefreshTokenController {
  private static blacklistedRefreshTokenRepository() {
    return getRepository(BlacklistedRefreshToken);
  }

  static async blackList(token: string) {
    await this.blacklistedRefreshTokenRepository().insert({
      token,
    });
    return token;
  }

  static async isBlacklisted(token: string) {
    const blacklisted = await this.blacklistedRefreshTokenRepository().findOne({
      token,
    });
    return blacklisted !== undefined;
  }
}
