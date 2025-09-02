import jwt from "jsonwebtoken";
import { NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN = "7d" } from "../config/env.js";

if (!JWT_SECRET) {
  console.warn("[Auth] JWT_SECRET is not set. Set it in your .env");
}

const isProd = NODE_ENV === "production";

export const signToken = (payload, expiresIn = JWT_EXPIRES_IN) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

export const setAuthCookie = (res, token) => {
  const ms =
    JWT_EXPIRES_IN.endsWith("d")
      ? parseInt(JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000
      : JWT_EXPIRES_IN.endsWith("h")
      ? parseInt(JWT_EXPIRES_IN) * 60 * 60 * 1000
      : parseInt(JWT_EXPIRES_IN) * 1000 || 7 * 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: ms,
    path: "/",
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
  });
};
