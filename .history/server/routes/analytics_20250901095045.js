import { Router } from "express";
import { trackEvent } from "../middleware/analytics.js";
import { overview } from "../controllers/analyticsController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

// client calls POST /analytics/track with { path, referrer, utm }
router.post("/track", trackEvent);

// admin dashboard charts
router.get("/overview", protect, authorize("admin"), overview);

export default router;
