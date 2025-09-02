import mongoose from "mongoose";

const reactionTypes = ["like", "dislike", "love"];

const reactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    type: { type: String, enum: reactionTypes, required: true },
  },
  { _id: false, timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    tags: [String],
    category: String,
    images: [String],
    videos: [String],
    links: {
      live: String,
      code: String,
    },
    // Store reactions & quick counters
    reactions: [reactionSchema],
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

export default mongoose.model("Project", projectSchema);
