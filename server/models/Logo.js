import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    client: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    description: { type: String, trim: true },
    reactionCounts: {
      like: { type: Number, default: 0 },
      dislike: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

logoSchema.statics.recalcReactionCounts = async function (logoId) {
  const { default: Reaction } = await import("./Reaction.js");
  const rows = await Reaction.aggregate([
    {
      $match: {
        targetType: "Logo",
        target: new mongoose.Types.ObjectId(logoId),
      },
    },
    { $group: { _id: "$type", n: { $sum: 1 } } },
  ]);
  const map = rows.reduce((acc, r) => ({ ...acc, [r._id]: r.n }), {});
  return this.findByIdAndUpdate(
    logoId,
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

export default mongoose.model("Logo", logoSchema);
