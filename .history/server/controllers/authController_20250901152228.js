// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import {
  signToken,
  setAuthCookie,
  clearAuthCookie,
} from "../utils/generateToken.js";
import { ADMIN_EMAIL } from "../config/env.js";
import asyncHandler from "../middleware/asyncHandler.js";

// POST /api/v1/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);

  // Simple, safer admin rule: first user OR fixed admin email from env.
  const isFirstUser = (await User.countDocuments()) === 0;
  const role = isFirstUser || email === ADMIN_EMAIL ? "admin" : "user";

  const user = await User.create({
    name,
    email,
    password: hashed,
    avatar,
    role,
  });

  const token = signToken({ id: user._id, role: user.role });
  setAuthCookie(res, token);

  // Return both token and user data for frontend storage
  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
    // Include token expiry information
    tokenExpiry:
      Date.now() + (process.env.JWT_EXPIRE_MS || 7 * 24 * 60 * 60 * 1000),
  });
});

// POST /api/v1/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await user.matchPassword(password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ id: user._id, role: user.role });
  setAuthCookie(res, token);

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
    // Include token expiry information
    tokenExpiry:
      Date.now() + (process.env.JWT_EXPIRE_MS || 7 * 24 * 60 * 60 * 1000),
  });
});

// GET /api/v1/auth/me
export const me = asyncHandler(async (req, res) => {
  // req.user is hydrated by protect()
  res.json({ user: req.user });
});

// POST /api/v1/auth/logout
export const logout = asyncHandler(async (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});
