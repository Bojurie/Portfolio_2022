// routes/index.js
import { Router } from "express";

// Use the actual filenames that exist in your repo:
import authRoutes from "./auth.js";
import projectRoutes from "./projects.js";
import logoRoutes from "./logoRoutes.js";
import reviewRoutes from "./reviews.js";
import analyticsRoutes from "./analytics.js";
import dashboardRoutes from "./dashboard.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/logos", logoRoutes);
router.use("/reviews", reviewRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
