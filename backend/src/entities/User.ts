import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { CodeReview } from "./CodeReview";
import { Room } from "./Room";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
    unique: true,
  })
  username!: string;

  @Column({
    length: 320,
    unique: true,
  })
  email!: string;

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

  @Column({
    length: 2000,
    nullable: true,
  })
  avatarUrl?: string;

  @Column({
    length: 120,
    nullable: true,
  })
  password?: string;

  @OneToMany(() => CodeReview, (codeReview: CodeReview) => codeReview.user)
  codeReviews!: CodeReview[];

  @OneToMany(() => Room, (room: Room) => room.user)
  rooms!: Room[];
}
