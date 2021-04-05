import { Router } from "express";
import { protectRoute } from "../../middlewares/auth";
import { checkAuth, getOneUser, login, register } from "./users.controller";

const router = Router();

router.get("/auth/check", protectRoute, checkAuth);

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/:userId", protectRoute, getOneUser);

export default router;
