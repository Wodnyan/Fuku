import { Router } from "express";
import { protectRoute } from "../../middlewares/auth";
import {
  getAllCodeReviews,
  getOneCodeReview,
  postCodeReview,
} from "./codeReviews.controller";

const router = Router();

router.post("/", protectRoute, postCodeReview);

router.get("/", getAllCodeReviews);

// TODO: Protect Route
router.get("/:codeReviewId", protectRoute, getOneCodeReview);

router.delete("/:codeReviewId");

router.patch("/:codeReviewId");

export default router;
