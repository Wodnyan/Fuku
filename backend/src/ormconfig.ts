import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import path from "path";
import { __prod__ } from "./constants";
dotenv.config();

export const connectionConfig = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PW,
  database: process.env.PG_DB,
  entities: [path.join(__dirname, "/entities/*.ts")],
  synchronize: !__prod__,
} as ConnectionOptions;
