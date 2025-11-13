/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE: "development" | "production";
  JWT_ACCESS_SECRET: string;
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_EXPIRE: string;
  EMAIL: string;
  PASSWORD: string;
  JWT_REFRESH_EXPIRE: string;
  JWT_REFRESH_SECRET: string;
  FRONTEND_URL:string,
  EXPRESS_SESSION_SECRET:string,
  GOOGLE_CALLBACK_URL:string,
  CLIENT_SECRET:string,
  CLIENT_ID:string
}

const loadEnvVariable = (): EnvConfig => {
  const requiredEnv: string[] = [
    "PORT",
    "DB_URL",
    "NODE",
    "JWT_ACCESS_SECRET",
    "BCRYPT_SALT_ROUND",
    "JWT_ACCESS_EXPIRE",
    "EMAIL",
    "PASSWORD",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRE",
    "FRONTEND_URL",
    "EXPRESS_SESSION_SECRET",
    "GOOGLE_CALLBACK_URL",
    "CLIENT_SECRET",
    "CLIENT_ID"
  ];

  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required Environment Variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT!,
    DB_URL: process.env.DB_URL!,
    NODE: process.env.NODE as "development" | "production",
    JWT_ACCESS_SECRET: process.env.WT_ACCESS_SECRET!,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND!,
    JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE!,
    EMAIL: process.env.EMAIL!,
    PASSWORD: process.env.PASSWORD!,
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    FRONTEND_URL:process.env.FRONTEND_URL!,
    EXPRESS_SESSION_SECRET:process.env.EXPRESS_SESSION_SECRET!,
    GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL!,
    CLIENT_SECRET:process.env.CLIENT_SECRET!,
    CLIENT_ID:process.env.CLIENT_ID!,
  };
};

export const envVars = loadEnvVariable();
