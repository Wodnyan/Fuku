import { Router } from "express";
import { protectRoute } from "../../middlewares/auth";
import { checkAuth, login, logoutUser, register } from "./auth.controller";

const router = Router();

router.delete("/logout", protectRoute, logoutUser);

router.get("/check", protectRoute, checkAuth);

router.post("/register", register);
router.post("/login", login);

export default router;
