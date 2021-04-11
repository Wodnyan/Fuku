import { Router } from "express";
import { blacklistRefreshToken, refreshAccessToken } from "./tokens.controller";

const router = Router();

router.get("/access-token/refresh", refreshAccessToken);
// Internal Use Only
router.post("/refresh-token/blacklist", blacklistRefreshToken);

export default router;
