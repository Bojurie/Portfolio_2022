import { Router } from "express";
import { dashboardSummary } from "../controllers/dashboardController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/summary", protect, authorize("admin"), dashboardSummary);

export default router;
