import { Router } from "express";
import users from "./users/users.routes";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "Welcome to the fuku api v1",
  });
});

router.use("/users", users);

export default router;
