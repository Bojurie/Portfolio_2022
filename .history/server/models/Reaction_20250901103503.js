import mongoose from "mongoose";
import { REACTION_TYPES } from "./Project.js"; // reuse the same list

const reactionSchema = new mongoose.Schema(
  {
    targetType: {
      type: String,
      enum: ["Project", "Logo"],
      required: true,
      index: true,
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: { type: String, enum: REACTION_TYPES, required: true },
  },
  { timestamps: true }
);

reactionSchema.index({ targetType: 1, target: 1, user: 1 }, { unique: true });

export default mongoose.model("Reaction", reactionSchema);
