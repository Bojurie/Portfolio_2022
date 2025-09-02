import dotenv from "dotenv";
dotenv.config();

export const {
  NODE_ENV = "development",
  PORT = 5000,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN = "7d",
  CORS_ORIGIN = "*",
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = process.env;
