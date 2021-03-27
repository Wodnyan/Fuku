import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createAccessToken = (userId: number): Promise<string> => {
  return new Promise((resolve, rejects) => {
    jwt.sign(
      {
        userId,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "15m",
      },
      (error: any, token: any) => {
        if (error) return rejects(error);
        resolve(token);
      }
    );
  });
};

export const createRefreshToken = (userId: number): Promise<string> => {
  return new Promise((resolve, rejects) => {
    jwt.sign(
      {
        userId,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "1d",
      },
      (error: any, token: any) => {
        if (error) return rejects(error);
        resolve(token);
      }
    );
  });
};

export const validateAccessToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

export const validateRefreshToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};
