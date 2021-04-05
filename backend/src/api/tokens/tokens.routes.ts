import { Router } from "express";
import { refreshAccessToken } from "./tokens.controller";

const router = Router();

router.get("/access-token/refresh", refreshAccessToken);
// Internal Use Only
router.post("/refresh-token/blacklist");

export default router;
