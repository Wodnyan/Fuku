import { Router } from "express";
import users from "./users/users.routes";
import codeReviews from "./codeReviews/codeReviews.routes";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "Welcome to the fuku api v1",
  });
});

router.use("/users", users);
router.use("/code-reviews", codeReviews);

export default router;
