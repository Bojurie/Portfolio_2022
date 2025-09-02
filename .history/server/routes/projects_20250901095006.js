import { Router } from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getProject,
  addProjectReview,
} from "../controllers/projectController.js";
import {
  reactToProject,
  removeReactionFromProject,
} from "../controllers/reactionController.js";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProject);

router.post("/", protect, authorize("admin"), createProject);
router.put("/:id", protect, authorize("admin"), updateProject);
router.delete("/:id", protect, authorize("admin"), deleteProject);

// reviews on project
router.post("/:id/reviews", protect, addProjectReview);

// reactions on project
router.post("/:id/react", protect, reactToProject);
router.delete("/:id/react", protect, removeReactionFromProject);

export default router;
