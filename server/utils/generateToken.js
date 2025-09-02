// utils/generateToken.js
import jwt from "jsonwebtoken";

const { NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN = "7d" } = process.env;

const isProd = NODE_ENV === "production";

if (!JWT_SECRET) {
  console.warn("[Auth] Missing JWT_SECRET in env.");
}

// Calculate expiry timestamp in milliseconds
const calculateExpiry = (expiresIn = JWT_EXPIRES_IN) => {
  if (expiresIn.endsWith("d")) {
    const days = parseInt(expiresIn);
    return Date.now() + days * 24 * 60 * 60 * 1000;
  }
  if (expiresIn.endsWith("h")) {
    const hours = parseInt(expiresIn);
    return Date.now() + hours * 60 * 60 * 1000;
  }
  // Default to 7 days
  return Date.now() + 7 * 24 * 60 * 60 * 1000;
};

export const signToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const setAuthCookie = (res, token) => {
  const expiresInMs = calculateExpiry();

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: expiresInMs - Date.now(),
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

// Helper to get token expiry timestamp
export const getTokenExpiry = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
  } catch {
    return null;
  }
};
