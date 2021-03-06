import { Router } from "express";
import users from "./users/users.routes";
import oauth from "./oauth/oauth.routes";
import rooms from "./rooms/rooms.routes";
import tokens from "./tokens/tokens.routes";
import auth from "./auth/auth.routes";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "Welcome to the fuku api v1",
  });
});

router.use("/users", users);
router.use("/auth", auth);
router.use("/oauth", oauth);
router.use("/rooms", rooms);
router.use("/tokens", tokens);

export default router;
