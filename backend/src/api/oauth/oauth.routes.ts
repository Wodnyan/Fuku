import { Router } from "express";
import passport from "passport";
import { FRONTEND_URL } from "../../constants";

const router = Router();

const SUCCESS_REDIRECT = `${FRONTEND_URL}/rooms`;

router.get(
  "/github",
  passport.authenticate("github", {
    session: false,
  })
);
router.get("/github/callback", (req, res, next) =>
  passport.authenticate(
    "github",
    {
      successRedirect: SUCCESS_REDIRECT,
      failureRedirect: `${FRONTEND_URL}/auth/sign-up`,
      session: false,
    },
    async (error, { refreshToken }) => {
      if (error) return next(error);
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
      });
      res.redirect(SUCCESS_REDIRECT);
    }
  )(req, res)
);

export default router;
