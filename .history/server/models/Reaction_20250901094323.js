// models/Reaction.js
const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["like", "love", "wow", "haha", "sad", "angry", "dislike"],
      required: true,
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reactionSchema.index({ project: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Reaction", reactionSchema);
