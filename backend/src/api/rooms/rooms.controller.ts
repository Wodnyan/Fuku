import { NextFunction, Request, Response } from "express";
import { RoomController } from "../../controllers/room";
import { CustomRequestUser } from "../../types";

export const getAllRooms = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await RoomController.getAll();
    res.json({
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roomId } = req.params;
    const room = await RoomController.getOne(Number(roomId));
    res.json({
      room,
    });
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon } = req.body;
    const { id } = req.user as CustomRequestUser;
    const room = await RoomController.create(
      {
        name,
        icon,
      },
      id
    );
    res.status(201).json({
      room,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roomId } = req.params;
    const { id } = req.user as CustomRequestUser;
    const { icon } = req.body;
    const room = await RoomController.updateIcon(Number(roomId), icon, id);
    res.json({
      room,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roomId } = req.params;
    const { id } = req.user as CustomRequestUser;
    await RoomController.delete(Number(roomId), id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
