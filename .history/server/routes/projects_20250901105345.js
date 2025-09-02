// src/routes/projectRoutes.js
import { Router } from "express";
import { body } from "express-validator";
import { protect, isAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { projectMediaFields } from "../middleware/upload.js";
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  listCategories,
} from "../controllers/projectController.js";

const router = Router();

router.get("/", listProjects);
router.get("/categories", listCategories);
router.get("/:id", getProject);

// Admin/owner only
router.post(
  "/",
  protect,
  isAdmin,
  projectMediaFields,
  body("title").isLength({ min: 2 }),
  body("category").isIn(["React", "Next.js", "MERN", "Full-Stack", "Node.js"]),
  validate,
  createProject
);

router.patch(
  "/:id",
  protect,
  isAdmin,
  projectMediaFields,
  validate,
  updateProject
);

router.delete("/:id", protect, isAdmin, deleteProject);

export default router;
