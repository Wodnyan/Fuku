import {
  Column,
  CreateDateColumn,
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

  @Column({
    length: 5000,
    nullable: false,
  })
  description!: string;

  @ManyToOne(() => User, (user: User) => user.codeReviews)
  user!: User;

  @ManyToOne(() => Room, (room) => room.codeReviews)
  room!: Room;

  @Column({
    type: "timestamp with time zone",
  })
  @CreateDateColumn()
  createdAt!: string;

  @Column({
    type: "timestamp with time zone",
  })
  @UpdateDateColumn()
  updatedAt!: string;
}
