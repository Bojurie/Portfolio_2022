import { Router } from "express";

import authRoutes from "./auth";
import projectRoutes from "./projects"; // was "./projects"
import logoRoutes from "./logoRoutes.js";
import reviewRoutes from "./reviews"; // was "./reviews"
import analyticsRoutes from "./analytics";
import dashboardRoutes from "./dashboard";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/logos", logoRoutes);
router.use("/reviews", reviewRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/dashboard", dashboardRoutes);
