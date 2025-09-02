import jwt from "jsonwebtoken";
import { NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

const isProd = NODE_ENV === "production";
const DEFAULT_TTL = "7d"; // fallback if env not set
const TOKEN_TTL = JWT_EXPIRES_IN || DEFAULT_TTL;

if (!JWT_SECRET) {
  console.warn(
    "[auth] JWT_SECRET is not set – tokens cannot be signed/verified."
  );
}

/**
 * Sign a JWT for the given payload.
 * @param {object} payload - e.g. { id: user._id, role: user.role }
 * @param {object} opts - { expiresIn?: string|number }
 */
export const signToken = (payload, opts = {}) => {
  const { expiresIn = TOKEN_TTL } = opts;
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

/* Convert TTL like "7d" / "12h" / "30m" / seconds number/string → ms */
const toMs = (val) => {
  if (!val) return 7 * 24 * 60 * 60 * 1000; // 7d
  if (typeof val === "number") return val * 1000; // seconds → ms
  const str = String(val).trim();
  const n = parseInt(str, 10);
  if (str.endsWith("d")) return n * 24 * 60 * 60 * 1000;
  if (str.endsWith("h")) return n * 60 * 60 * 1000;
  if (str.endsWith("m")) return n * 60 * 1000;
  return Number.isFinite(n) ? n * 1000 : 7 * 24 * 60 * 60 * 1000;
};

/**
 * Set the auth cookie consistently.
 * @param {Response} res
 * @param {string} token
 * @param {object} opts - { expiresIn?: string|number, domain?: string }
 */
export const setAuthCookie = (res, token, opts = {}) => {
  const maxAge = toMs(opts.expiresIn || TOKEN_TTL);
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd, // auto-secure on prod
    sameSite: "lax",
    maxAge,
    path: "/",
    ...(opts.domain ? { domain: opts.domain } : {}),
  });
};

export const clearAuthCookie = (res, opts = {}) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    ...(opts.domain ? { domain: opts.domain } : {}),
  });
};
