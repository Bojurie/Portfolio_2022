import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const protect = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

export const isAdmin = (req, _res, next) => {
  if (req.user?.role !== "admin") {
    const err = new Error("Admin only");
    err.statusCode = 403;
    throw err;
  }
  next();
};
