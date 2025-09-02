import jwt from "jsonwebtoken";
import { NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN = "7d" } from "../config/env.js";

const isProd = NODE_ENV === "production";

if (!JWT_SECRET) {
  console.warn("[Auth] Missing JWT_SECRET in env.");
}

export const signToken = (payload, expiresIn = JWT_EXPIRES_IN) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

// Parse "7d" / "12h" / seconds → ms
const toMs = (val) => {
  if (!val) return 7 * 24 * 60 * 60 * 1000;
  if (String(val).endsWith("d")) return parseInt(val) * 24 * 60 * 60 * 1000;
  if (String(val).endsWith("h")) return parseInt(val) * 60 * 60 * 1000;
  const s = parseInt(val);
  return Number.isFinite(s) ? s * 1000 : 7 * 24 * 60 * 60 * 1000;
};

export const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax", // switch to 'none' if you truly need cross-site cookies + HTTPS
    maxAge: toMs(JWT_EXPIRES_IN),
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
