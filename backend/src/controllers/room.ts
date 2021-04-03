import { getRepository } from "typeorm";
import { Room } from "../entities/Room";
import { HttpException } from "../exceptions/HttpException";
import { User } from "./user";

interface CreateRoomData {
  name: string;
  icon?: string;
}

export class RoomController {
  private static get select() {
    const userSelect = User.select.map((select) => `user.${select}`);
    return [
      "rooms.id",
      "rooms.name",
      "rooms.icon",
      "rooms.createdAt",
      ...userSelect,
    ];
  }

  private static roomRepository() {
    return getRepository(Room);
  }

  static async create(data: CreateRoomData, userId: number) {
    // TODO: Validation
    const room = await this.roomRepository().insert({
      icon: data.icon,
      name: data.name,
      user: {
        id: userId,
      },
    });
    return room;
  }

  static async updateIcon(id: number, icon: string, userId: number) {
    const isOwner = await this.isOwner(id, userId);
    if (!isOwner) {
      throw new HttpException("Unauthorized", 401);
    }
    const updatedRoom = await this.roomRepository().update(id, {
      icon,
    });
    return updatedRoom;
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

  static async getAll() {
    const rooms = await this.roomRepository()
      .createQueryBuilder("rooms")
      .leftJoinAndSelect("rooms.user", "user")
      .select(this.select)
      .getMany();
    return rooms;
  }

  private static async isOwner(id: number, userId: number) {
    const room = await this.getOne(id);
    return room?.user.id === userId;
  }
}
