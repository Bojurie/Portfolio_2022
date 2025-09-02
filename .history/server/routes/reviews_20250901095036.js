import { Router } from "express";
import { protect } from "../middleware/auth.js";
import {
  createSiteReview,
  getSiteReviews,
} from "../controllers/reviewController.js";

const router = Router();

router.get("/site", getSiteReviews);
router.post("/site", protect, createSiteReview);

export default router;
