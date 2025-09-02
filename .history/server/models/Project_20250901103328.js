import mongoose from "mongoose";

export const REACTION_TYPES = ["like", "dislike", "love"];

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    category: { type: String, trim: true },
    images: [String],
    videos: [String],
    links: {
      live: String,
      code: String,
    },
    reactionCounts: {
      like: { type: Number, default: 0 },
      dislike: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ title: "text", description: "text", tags: "text" });

projectSchema.statics.recalcReactionCounts = async function (projectId) {
  const { default: Reaction } = await import("./Reaction.js");
  const rows = await Reaction.aggregate([
    {
      $match: {
        targetType: "Project",
        target: new mongoose.Types.ObjectId(projectId),
      },
    },
    { $group: { _id: "$type", n: { $sum: 1 } } },
  ]);
  const map = rows.reduce((acc, r) => ({ ...acc, [r._id]: r.n }), {});
  return this.findByIdAndUpdate(
    projectId,
    {
      reactionCounts: {
        like: map.like || 0,
        dislike: map.dislike || 0,
        love: map.love || 0,
      },
    },
    { new: true }
  );
};

export default mongoose.model("Project", projectSchema);
