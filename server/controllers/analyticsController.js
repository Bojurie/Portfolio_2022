import asyncHandler from "../middleware/asyncHandler.js";
import PageView from "../models/PageView.js";
import dayjs from "dayjs";

export const track = asyncHandler(async (req, res) => {
  // handled in middleware/analytics.js -> trackEvent
  // expose here if you want controller pattern; keeping middleware variant is fine
  res.json({ ok: true });
});

export const overview = asyncHandler(async (req, res) => {
  const since = dayjs().subtract(30, "day").toDate();

  const [byDay, byRef, byCountry, returning] = await Promise.all([
    PageView.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { date: "$createdAt", format: "%Y-%m-%d" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    PageView.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: "$referrer", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
    PageView.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    PageView.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: "$visitorId",
          first: { $min: "$createdAt" },
          last: { $max: "$createdAt" },
          hits: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          returning: { $sum: { $cond: [{ $gt: ["$hits", 1] }, 1, 0] } },
        },
      },
    ]),
  ]);

  res.json({
    visitorsByDay: byDay,
    topReferrers: byRef,
    byCountry,
    returningStats: returning[0] || { total: 0, returning: 0 },
  });
});
