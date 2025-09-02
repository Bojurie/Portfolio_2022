import Review from "../models/Review.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { paginate } from "../utils/pagination.js";

export const createSiteReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const review = await Review.create({
    targetType: "site",
    target: null,
    user: req.user._id,
    rating,
    comment,
  });
  res.status(201).json(review);
});

export const getSiteReviews = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const [items, meta] = await paginate(
    Review.find({ targetType: "site", status: "approved" }).sort("-createdAt"),
    { page, limit }
  );
  res.json({ items, meta });
});
