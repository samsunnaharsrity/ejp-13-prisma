import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 8000,

  jwtSecret:
    process.env.JWT_SECRET || "default-secret",

  frontendUrl:
    process.env.FRONTEND_URL || "http://localhost:3000",
};