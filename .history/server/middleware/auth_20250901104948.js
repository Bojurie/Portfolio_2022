import { verifyToken } from "../utils/generateToken.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Not authorized" });

    req.user = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
    next();
  } catch {
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
