import { Router } from "express";
import { protectRoute } from "../../middlewares/auth";
import { getOneUser } from "./users.controller";

const router = Router();

router.get("/:userId", protectRoute, getOneUser);

export default router;
