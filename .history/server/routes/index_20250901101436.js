import { Router } from "express";

import authRoutes from "./authRoutes.js";
import projectRoutes from "./projectRoutes.js"; // was "./projects"
import logoRoutes from "./logoRoutes.js";
import reviewRoutes from "./reviewRoutes.js"; // was "./reviews"
import analyticsRoutes from "./analyticsRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/logos", logoRoutes);
router.use("/reviews", reviewRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/dashboard", dashboardRoutes);
export default router;
