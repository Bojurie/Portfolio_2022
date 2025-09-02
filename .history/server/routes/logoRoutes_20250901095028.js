import { Router } from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  createLogo,
  updateLogo,
  deleteLogo,
  getLogos,
} from "../controllers/logoController.js";

const router = Router();

router.get("/", getLogos);
router.post("/", protect, authorize("admin"), createLogo);
router.put("/:id", protect, authorize("admin"), updateLogo);
router.delete("/:id", protect, authorize("admin"), deleteLogo);

export default router;
