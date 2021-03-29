import dotenv from "dotenv";

dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";

export const FRONTEND_URL = __prod__
  ? process.env.FRONTEND_URL
  : "http://localhost:4200";
