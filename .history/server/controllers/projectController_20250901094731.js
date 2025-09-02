import Project from "../models/Project.js";
import Review from "../models/Review.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { paginate } from "../utils/pagination.js";

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json({ ok: true });
});

export const getProjects = asyncHandler(async (req, res) => {
  const { page, limit, query } = req.query;
  const filter = query ? { $text: { $search: query } } : { isPublished: true };
  const [items, meta] = await paginate(
    Project.find(filter).sort("-createdAt"),
    { page, limit }
  );
  res.json({ items, meta });
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

export const addProjectReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  const review = await Review.create({
    targetType: "project",
    target: project._id,
    user: req.user._id,
    rating,
    comment,
  });

  res.status(201).json(review);
});
