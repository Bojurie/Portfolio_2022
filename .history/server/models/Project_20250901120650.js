import mongoose from "mongoose";

export const PROJECT_CATEGORIES = [
  "React",
  "MERN",
  "Full-Stack",
  "Node.js",
  "React-Native"
];

export const REACTION_TYPES = ["like", "dislike", "love"];

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    alt: { type: String, trim: true, default: "" },
    width: Number,
    height: Number,
    bytes: Number,
  },
  { _id: false }
);

const ShortVideoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["video/mp4", "video/webm", "video/ogg"],
      default: "video/mp4",
    },
    poster: { type: String, trim: true },
    duration: { type: Number, min: 0, max: 90 }, 
    width: Number,
    height: Number,
    bytes: Number,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: PROJECT_CATEGORIES,
      required: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && arr.every((t) => typeof t === "string"),
        message: "Tags must be an array of strings",
      },
      index: true,
      set: (arr) =>
        (Array.isArray(arr) ? arr : [])
          .map((t) => String(t).trim())
          .filter(Boolean)
          .filter((t, i, a) => a.indexOf(t) === i),
    },

    images: {
      type: [ImageSchema],
      default: [],
      validate: {
        validator: (arr) => (Array.isArray(arr) ? arr.length <= 3 : false),
        message: "You can upload up to 3 images only",
      },
    },

    shortVideo: { type: ShortVideoSchema, default: null },

    links: {
      live: { type: String, trim: true },
      code: { type: String, trim: true },
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

projectSchema.virtual("coverImage").get(function () {
  return this.images?.[0]?.url || null;
});

projectSchema.index({ title: "text", description: "text", tags: "text" });
projectSchema.index({ isPublished: 1, category: 1, createdAt: -1 });

projectSchema.statics.recalcReactionCounts = async function (projectId) {
  const { default: Reaction } = await import("./Reaction.js");
  const rows = await Reaction.aggregate([
    {
      $match: {
        targetType: "project",
        target: new mongoose.Types.ObjectId(projectId),
      },
    },
    { $group: { _id: "$type", n: { $sum: 1 } } },
  ]);
  const map = rows.reduce((acc, r) => ((acc[r._id] = r.n), acc), {});
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

projectSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Project", projectSchema);
