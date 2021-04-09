import { Router } from "express";
import { validateCodeReviewRouteParamIdMiddleware } from "../../../lib/validators/codeReview";
import { protectRoute } from "../../../middlewares/auth";
import {
  deleteCodeReview,
  getAllCodeReviews,
  getOneCodeReview,
  postCodeReview,
} from "./codeReviews.controller";

const router = Router({
  mergeParams: true,
});

router.post("/", protectRoute, postCodeReview);

router.get("/", getAllCodeReviews);

router.get(
  "/:codeReviewId",
  validateCodeReviewRouteParamIdMiddleware,
  getOneCodeReview
);

router.delete(
  "/:codeReviewId",
  validateCodeReviewRouteParamIdMiddleware,
  protectRoute,
  deleteCodeReview
);

export default router;
