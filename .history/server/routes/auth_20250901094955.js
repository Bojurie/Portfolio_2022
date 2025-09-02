import { Router } from "express";
import { body } from "express-validator";
import { register, login, me, logout } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post(
  "/register",
  authLimiter,
  body("name").isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  register
);

router.post(
  "/login",
  authLimiter,
  body("email").isEmail(),
  body("password").notEmpty(),
  login
);
router.get("/me", protect, me);
router.post("/logout", protect, logout);

export default router;
