import { Router } from "express";
import { protectRoute } from "../../middlewares/auth";
import { getAllCodeReviews, postCodeReview } from "./codeReviews.controller";

const router = Router();

router.post("/", protectRoute, postCodeReview);

router.get("/", getAllCodeReviews);

router.get("/:id");

router.delete("/:id");

router.patch("/:id");

export default router;
