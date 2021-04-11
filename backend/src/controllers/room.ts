import { getRepository } from "typeorm";
import { Room } from "../entities/Room";
import { HttpException } from "../exceptions/HttpException";
import {
  validateGetAllRoomsQueryParams,
  validateInsertRoom,
  validateUpdateRoom,
} from "../lib/validators/room";
import { User } from "./user";

interface CreateRoomData {
  name: string;
  description: string;
  icon?: string;
}
interface UpdateRoomData {
  description?: string;
  icon?: string;
}

interface GetAllOptions {
  name?: string;
  limit?: number;
  skip?: number;
  orderBy?: "asc" | "desc";
}

export class RoomController {
  private static get select() {
    const userSelect = User.select.map((select) => `user.${select}`);
    return [
      "rooms.id",
      "rooms.name",
      "rooms.description",
      "rooms.icon",
      "rooms.createdAt",
      ...userSelect,
    ];
  }

  private static roomRepository() {
    return getRepository(Room);
  }

  static async create(data: CreateRoomData, userId: number) {
    await validateInsertRoom(data);
    const room = await this.roomRepository().insert({
      icon: data.icon,
      name: data.name,
      description: data.description,
      user: {
        id: userId,
      },
    });
    return {
      id: room.identifiers[0].id,
    };
  }

  static async update(id: number, userId: number, update: UpdateRoomData) {
    await validateUpdateRoom(update);
    const isOwner = await this.isOwner(id, userId);
    if (!isOwner) {
      throw new HttpException("Unauthorized", 401);
    }
    let updateRoom = await this.roomRepository().findOne(id);
    updateRoom!.icon = update.icon;
    updateRoom!.description = update.description!;
    await this.roomRepository().save(updateRoom!);
    return updateRoom;
  }

  static async delete(id: number, userId: number) {
    const isOwner = await this.isOwner(id, userId);
    if (!isOwner) {
      throw new HttpException("Unauthorized", 401);
    }
    return this.roomRepository().delete(id);
  }

  static async getOne(id: number) {
    const room = await this.roomRepository()
      .createQueryBuilder("rooms")
      .where({
        id,
      })
      .leftJoinAndSelect("rooms.user", "user")
      .select(this.select)
      .getOne();
    if (!room) {
      throw new HttpException("No room found", 404);
    }
    return room;
  }

  static async getAll(options?: GetAllOptions) {
    await validateGetAllRoomsQueryParams(options);
    const rooms = await this.roomRepository()
      .createQueryBuilder("rooms")
      .leftJoinAndSelect("rooms.user", "user")
      .select(this.select)
      .where("rooms.name like :name", {
        name: `%${options?.name?.toString() || ""}%`,
      })
      .skip(options?.skip)
      .take(options?.limit)
      .orderBy("rooms.createdAt", options?.orderBy === "asc" ? "ASC" : "DESC")
      .getMany();
    return rooms;
  }

  private static async isOwner(id: number, userId: number) {
    const room = await this.getOne(id);
    return room?.user.id === userId;
  }
}
