// src/controllers/projectController.js
import Project, { PROJECT_CATEGORIES } from "../models/Project.js";
import asyncHandler from "../middleware/asyncHandler.js";

/** Build media payloads from multer files */
const buildMedia = (files) => {
  const images = (files?.images || []).map((f) => ({
    url: `/${f.path.replace(/\\/g, "/")}`,
    alt: "",
    width: undefined,
    height: undefined,
    bytes: f.size,
  }));

  const v = (files?.video || [])[0];
  const shortVideo = v
    ? {
        url: `/${v.path.replace(/\\/g, "/")}`,
        type: v.mimetype,
        bytes: v.size,
      }
    : null;

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
  if (tags) {
    const list = String(tags)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (list.length) filter.tags = { $all: list };
  }
  if (q) filter.$text = { $search: q };

  const take = Math.max(1, Math.min(50, +limit));
  const skip = (Math.max(1, +page) - 1) * take;

  const [items, total] = await Promise.all([
    Project.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(take)
      .lean({ virtuals: true })
      .select("-__v"),
    Project.countDocuments(filter),
  ]);

  res.json({
    items,
    total,
    page: Number(page),
    pages: Math.ceil(total / take),
  });
});

// GET /api/v1/projects/:id
export const getProject = asyncHandler(async (req, res) => {
  const doc = await Project.findById(req.params.id).lean({ virtuals: true });
  if (!doc) return res.status(404).json({ message: "Project not found" });
  res.json(doc);
});

// POST /api/v1/projects
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, category, tags = [], links } = req.body;
  const { images, shortVideo } = buildMedia(req.files);

  const payload = {
    title,
    description,
    category,
    tags: Array.isArray(tags) ? tags : [],
    images: images.slice(0, 3), // hard cap
    shortVideo,
    links,
  };

  const doc = await Project.create(payload);
  res.status(201).json(doc);
});

// PATCH /api/v1/projects/:id
export const updateProject = asyncHandler(async (req, res) => {
  const { title, description, category, tags, links, isPublished } = req.body;
  const { images: newImages, shortVideo } = buildMedia(req.files);

  const doc = await Project.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Project not found" });

  if (title !== undefined) doc.title = title;
  if (description !== undefined) doc.description = description;
  if (category !== undefined) doc.category = category;
  if (links !== undefined) doc.links = links;
  if (isPublished !== undefined) doc.isPublished = !!isPublished;

  if (tags !== undefined) {
    doc.tags = Array.isArray(tags)
      ? tags
      : String(tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
  }

  // append images (respect max 3)
  if (newImages.length) {
    const remaining = Math.max(0, 3 - doc.images.length);
    if (remaining > 0) {
      doc.images = [...doc.images, ...newImages.slice(0, remaining)];
    }
  }

  // replace short video if provided
  if (shortVideo) {
    doc.shortVideo = shortVideo;
  }

  await doc.save();
  const leanDoc = await Project.findById(doc._id)
    .lean({ virtuals: true })
    .select("-__v");
  res.json(leanDoc);
});

// GET /api/v1/projects/categories
export const listCategories = asyncHandler(async (_req, res) => {
  res.json({ categories: PROJECT_CATEGORIES });
});
