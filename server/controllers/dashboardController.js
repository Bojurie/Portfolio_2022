import asyncHandler from "../middleware/asyncHandler.js";
import Project from "../models/Project.js";
import Logo from "../models/Logo.js";
import Review from "../models/Review.js";
import PageView from "../models/PageView.js";

export const dashboardSummary = asyncHandler(async (req, res) => {
  const [projects, logos, reviews, views] = await Promise.all([
    Project.countDocuments(),
    Logo.countDocuments(),
    Review.countDocuments({ status: "approved" }),
    PageView.countDocuments(),
  ]);

  const reactionAgg = await Project.aggregate([
    {
      $group: {
        _id: null,
        like: { $sum: "$reactionCounts.like" },
        dislike: { $sum: "$reactionCounts.dislike" },
        love: { $sum: "$reactionCounts.love" },
      },
    },
  ]);

  res.json({
    totals: { projects, logos, reviews, views },
    reactions: reactionAgg[0] || { like: 0, dislike: 0, love: 0 },
  });
});
