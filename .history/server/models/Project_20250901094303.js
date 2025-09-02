// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a project title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: ["React", "Next.js", "MERN", "Full-Stack", "Node.js"],
    },
    tags: [String],
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    videoSources: [
      {
        src: String,
        type: String,
      },
    ],
    liveUrl: String,
    githubUrl: String,
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "project",
  justOne: false,
});

projectSchema.virtual("reactions", {
  ref: "Reaction",
  localField: "_id",
  foreignField: "project",
  justOne: false,
});

module.exports = mongoose.model("Project", projectSchema);
