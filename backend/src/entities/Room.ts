import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CodeReview } from "./CodeReview";
import { User } from "./User";

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    unique: true,
    length: 100,
  })
  name!: string;

  @Column({
    length: 2000,
    nullable: true,
  })
  icon?: string;

  @Column({
    length: 5000,
    nullable: false,
  })
  description!: string;

  @ManyToOne(() => User, (user) => user.rooms)
  user!: User;

  @OneToMany(() => CodeReview, (codeReview: CodeReview) => codeReview.room)
  codeReviews!: CodeReview[];

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
