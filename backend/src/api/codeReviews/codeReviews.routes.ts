import { Router } from "express";
import { postCodeReview } from "./codeReviews.controller";

const router = Router();

router.post("/", postCodeReview);

export default router;
