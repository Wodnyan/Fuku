import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BlacklistedRefreshToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 8001,
  })
  token!: string;
}
