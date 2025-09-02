import { Router } from "express";
import { body } from "express-validator";
import { protect, isAdmin } from "../middleware/auth.js";
import { validate, normalizeProjectBody } from "../middleware/validate.js";
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
// ❌ REMOVE THIS LINE - it's causing the error
// router.get("/projects/:id");  // DELETE THIS LINE

router.post(
  "/",
  protect,
  isAdmin,
  projectMediaFields,
  normalizeProjectBody,
  body("title").isLength({ min: 2 }).withMessage("Title is required"),
  body("category")
    .isIn(["React", "Next.js", "MERN", "Full-Stack", "Node.js"])
    .withMessage("Invalid category"),
  validate,
  createProject
);

router.patch(
  "/:id",
  protect,
  isAdmin,
  projectMediaFields,
  normalizeProjectBody,
  body("category")
    .optional()
    .isIn(["React", "Next.js", "MERN", "Full-Stack", "Node.js"]),
  validate,
  updateProject
);

router.delete("/:id", protect, isAdmin, deleteProject);

export default router;
