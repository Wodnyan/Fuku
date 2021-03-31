import { Strategy } from "passport-github";
import dotenv from "dotenv";
import axios from "axios";
import { User } from "../controllers/user";
import { createRefreshToken } from "../lib/jwt";

dotenv.config();

export const GithubStrategy = () =>
  new Strategy(
    {
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: "user:email",
    },
    async (
      accessToken: string,
      _refreshToken: string,
      profile: any,
      done: Function
    ) => {
      try {
        const { data: emails } = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const primaryEmail = emails.find(
          (email: any) => email.primary === true
        );
        const alreadySignedUp = await User.getOneByEmail(primaryEmail.email);
        if (!alreadySignedUp) {
          const { refreshToken } = await User.oauthRegister({
            email: primaryEmail.email,
            username: profile._json.login,
            avatar: profile._json.avatar_url,
          });
          done(null, { refreshToken });
        } else {
          const refreshToken = await createRefreshToken(alreadySignedUp.id);
          done(null, {
            refreshToken,
          });
        }
      } catch (error) {
        done(error);
      }
    }
  );
