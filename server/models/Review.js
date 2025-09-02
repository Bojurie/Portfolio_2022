import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    targetType: {
      type: String,
      enum: ["Site", "Project", "Logo"],
      required: true,
      index: true,
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "targetType",
      default: null, 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  { timestamps: true }
);

reviewSchema.index({ targetType: 1, target: 1, user: 1 });

export default mongoose.model("Review", reviewSchema);
