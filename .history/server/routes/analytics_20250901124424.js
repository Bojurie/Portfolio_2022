import { Router } from "express";
import { trackEvent } from "../middleware/analytics.js";
import { overview } from "../controllers/analyticsController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();


router.post("/track", trackEvent);

router.get("/overview", protect, authorize("admin"), overview);

export default router;
