import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
export class CodeReview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user: User) => user.codeReviews)
  user!: User;

  @ManyToOne(() => Room, (room) => room.codeReviews)
  room!: Room;

  @Column({
    type: "timestamp with time zone",
  })
  @UpdateDateColumn()
  createdAt!: string;

  @Column({
    type: "timestamp with time zone",
  })
  @UpdateDateColumn()
  updatedAt!: string;
}
