import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class CodeReview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.codeReviews)
  user!: User;

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
