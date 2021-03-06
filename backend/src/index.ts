import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import { FRONTEND_URL, __prod__ } from "./constants";
import { notFound, errorHandler } from "./middlewares/error";
import { createConnection } from "typeorm";
import { connectionConfig } from "./ormconfig";
import { checkAuth } from "./middlewares/auth";
import api from "./api/";
import passport from "passport";
import cors from "cors";
import passportSetup from "./passport";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Database setup
createConnection(connectionConfig);

passportSetup();

// Middleware
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan(__prod__ ? "common" : "dev"));
app.use(helmet());
app.use(checkAuth);
app.use("/api/v1", api);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
