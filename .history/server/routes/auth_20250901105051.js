// src/routes/authRoutes.js
import { Router } from "express";
import { body } from "express-validator";
import { register, login, me, logout } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiters.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post(
  "/register",
  authLimiter,
  body("name").trim().isLength({ min: 2 }).withMessage("Name too short"),
  body("email").isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  validate,
  register
);

router.post(
  "/login",
  authLimiter,
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
  validate,
  login
);

// You can allow logout without protect() so clients can always clear cookies.
// If you prefer, keep protect here.
router.get("/me", protect, me);
router.post("/logout", logout);

export default router;
