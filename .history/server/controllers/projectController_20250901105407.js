// src/controllers/projectController.js
import Project, { PROJECT_CATEGORIES } from "../models/Project.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Build media payload from multer files
const buildMedia = (files) => {
  const images =
    (files?.images || []).map((f) => ({
      url: `/${f.path.replace(/\\/g, "/")}`,
      alt: "",
    })) ?? [];

  let shortVideo = null;
  const v = (files?.video || [])[0];
  if (v) {
    shortVideo = {
      url: `/${v.path.replace(/\\/g, "/")}`,
      type: v.mimetype,
      bytes: v.size,
      // poster can be set later (client) or via a processor
    };
  }
  return { images, shortVideo };
};

// GET /api/v1/projects
export const listProjects = asyncHandler(async (req, res) => {
  const {
    q,
    category,
    tags, // comma-separated
    page = 1,
    limit = 12,
    sort = "-createdAt",
    published = "true",
  } = req.query;

  const filter = {};
  if (published === "true") filter.isPublished = true;
  if (category) filter.category = category;
  if (tags)
    filter.tags = {
      $all: String(tags)
        .split(",")
        .map((t) => t.trim()),
    };
  if (q) {
    filter.$text = { $search: q };
  }

  const skip = (Math.max(1, +page) - 1) * Math.max(1, +limit);

  const [items, total] = await Promise.all([
    Project.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Math.max(1, +limit))
      .lean({ virtuals: true })
      .select("-__v"),
    Project.countDocuments(filter),
  ]);

  res.json({
    items,
    total,
    page: Number(page),
    pages: Math.ceil(total / Math.max(1, +limit)),
  });
});

// GET /api/v1/projects/:id
export const getProject = asyncHandler(async (req, res) => {
  const doc = await Project.findById(req.params.id).lean({ virtuals: true });
  if (!doc) return res.status(404).json({ message: "Project not found" });
  res.json(doc);
});

// POST /api/v1/projects  (owner/admin only)
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, category, tags = [], links } = req.body;

  const { images, shortVideo } = buildMedia(req.files);

  const doc = await Project.create({
    title,
    description,
    category,
    tags: Array.isArray(tags)
      ? tags
      : String(tags || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
    images,
    shortVideo,
    links,
  });

  res.status(201).json(doc);
});

// PATCH /api/v1/projects/:id  (owner/admin only)
export const updateProject = asyncHandler(async (req, res) => {
  const { title, description, category, tags, links, isPublished } = req.body;
  const update = {};

  if (title !== undefined) update.title = title;
  if (description !== undefined) update.description = description;
  if (category !== undefined) update.category = category;
  if (tags !== undefined)
    update.tags = Array.isArray(tags)
      ? tags
      : String(tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
  if (links !== undefined) update.links = links;
  if (isPublished !== undefined) update.isPublished = !!isPublished;

  // media updates (append new files; client can also send explicit replace flag if needed)
  const { images, shortVideo } = buildMedia(req.files);
  if (images.length) {
    update.$push = { ...(update.$push || {}), images: { $each: images } };
  }
  if (shortVideo) {
    update.shortVideo = shortVideo; // replace the single short video
  }

  const doc = await Project.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  }).lean({ virtuals: true });

  if (!doc) return res.status(404).json({ message: "Project not found" });
  res.json(doc);
});

// DELETE /api/v1/projects/:id  (owner/admin only)
export const deleteProject = asyncHandler(async (req, res) => {
  const doc = await Project.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Project not found" });
  res.json({ ok: true });
});

// GET /api/v1/projects/categories  (for client dropdowns)
export const listCategories = asyncHandler(async (_req, res) => {
  // Return canonical categories; client can prepend "All"
  res.json({ categories: PROJECT_CATEGORIES });
});
