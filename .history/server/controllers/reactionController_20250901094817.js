import Project from "../models/Project.js";
import asyncHandler from "../middleware/asyncHandler.js";

const TYPES = ["like", "dislike", "love"];

export const reactToProject = asyncHandler(async (req, res) => {
  const { type } = req.body;
  if (!TYPES.includes(type))
    return res.status(400).json({ message: "Invalid reaction type" });

  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  const existing = project.reactions.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (existing) {
    // decrement old
    project.reactionCounts[existing.type] = Math.max(
      0,
      (project.reactionCounts[existing.type] || 0) - 1
    );
    existing.type = type;
  } else {
    project.reactions.push({ user: req.user._id, type });
  }
  // increment new
  project.reactionCounts[type] = (project.reactionCounts[type] || 0) + 1;

  await project.save();
  res.json({ reactionCounts: project.reactionCounts });
});

export const removeReactionFromProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  const idx = project.reactions.findIndex(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (idx === -1)
    return res.status(404).json({ message: "Reaction not found" });

  const typ = project.reactions[idx].type;
  project.reactionCounts[typ] = Math.max(
    0,
    (project.reactionCounts[typ] || 0) - 1
  );
  project.reactions.splice(idx, 1);
  await project.save();

  res.json({ reactionCounts: project.reactionCounts });
});
