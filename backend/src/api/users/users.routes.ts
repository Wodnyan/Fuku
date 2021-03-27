import { Router } from "express";
import { protectRoute } from "../../middlewares/auth";
import { getOneUser, login, register } from "./users.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/:id", protectRoute, getOneUser);

export default router;
