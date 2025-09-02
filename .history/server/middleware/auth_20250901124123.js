import { verifyToken } from "../utils/generateToken.js";
import User from "../models/User.js";

const getTokenFromReq = (req) => {
  if (req?.cookies?.token) return req.cookies.token;

  const auth = req.headers.authorization || req.headers.Authorization;
  if (auth && typeof auth === "string" && auth.startsWith("Bearer ")) {
    return auth.split(" ")[1];
  }

  if (req.headers["x-access-token"]) return req.headers["x-access-token"];
  return null;
};

export const protect = async (req, res, next) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = verifyToken(token); 
    const user = await User.findById(decoded.id).lean();
    if (!user) return res.status(401).json({ message: "Not authorized" });

    req.user = {
      id: String(user._id),
      role: user.role,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
    res.locals.user = req.user;

    return next();
  } catch (_err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

export const optionalAuth = async (req, _res, next) => {
  const token = getTokenFromReq(req);
  if (!token) return next();

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).lean();
    if (user) {
      req.user = {
        id: String(user._id),
        role: user.role,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };
      res.locals.user = req.user;
    }
  } catch {
  }
  next();
};

export const authorize =
  (...allowed) =>
  (req, res, next) => {
    const roles = allowed.length ? allowed : ["admin"];
    if (!req.user) return res.status(401).json({ message: "Not authorized" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };

export const isAdmin = (req, res, next) => authorize("admin")(req, res, next);
