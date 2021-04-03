import { Router } from "express";
import { validateRoomParamIdMiddleware } from "../../lib/validators/room";
import { protectRoute } from "../../middlewares/auth";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getOneRoom,
  updateRoom,
} from "./rooms.controller";

const router = Router();

router.get("/", getAllRooms);
router.post("/", protectRoute, createRoom);

router.use("/:roomId", validateRoomParamIdMiddleware);

router.get("/:roomId", protectRoute, getOneRoom);
router.put("/:roomId", protectRoute, updateRoom);
router.delete("/:roomId", protectRoute, deleteRoom);

export default router;
