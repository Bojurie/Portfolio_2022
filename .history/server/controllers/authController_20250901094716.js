import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} from "../config/env.js";
import asyncHandler from "../middleware/asyncHandler.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ message: "Email already registered" });

  const role =
    email === ADMIN_EMAIL && password === ADMIN_PASSWORD ? "admin" : "user";
  const user = await User.create({ name, email, password, role });
  const token = signToken(user);

  res
    .cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false })
    .status(201)
    .json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = signToken(user);
  res
    .cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false })
    .json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
});

export const me = asyncHandler(async (req, res) =>
  res.json({ user: req.user })
);

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token").json({ ok: true });
});
