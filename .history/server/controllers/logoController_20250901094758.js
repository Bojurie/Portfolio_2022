import Logo from "../models/Logo.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { paginate } from "../utils/pagination.js";

export const createLogo = asyncHandler(async (req, res) => {
  const logo = await Logo.create(req.body);
  res.status(201).json(logo);
});

export const updateLogo = asyncHandler(async (req, res) => {
  const logo = await Logo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!logo) return res.status(404).json({ message: "Logo not found" });
  res.json(logo);
});

export const deleteLogo = asyncHandler(async (req, res) => {
  const logo = await Logo.findByIdAndDelete(req.params.id);
  if (!logo) return res.status(404).json({ message: "Logo not found" });
  res.json({ ok: true });
});

export const getLogos = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const [items, meta] = await paginate(
    Logo.find({ isPublished: true }).sort("-createdAt"),
    { page, limit }
  );
  res.json({ items, meta });
});
