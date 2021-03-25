import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import { __prod__ } from "./constants";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(morgan(__prod__ ? "common" : "dev"));
app.use(helmet());

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
