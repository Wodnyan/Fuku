import { Router } from "express";
import { protectRoute } from "../../middlewares/auth";
import {
  deleteCodeReview,
  getAllCodeReviews,
  getOneCodeReview,
  postCodeReview,
} from "./codeReviews.controller";

const router = Router();

router.post("/", protectRoute, postCodeReview);

router.get("/", getAllCodeReviews);

router.get("/:codeReviewId", protectRoute, getOneCodeReview);

router.delete("/:codeReviewId", protectRoute, deleteCodeReview);

export default router;
