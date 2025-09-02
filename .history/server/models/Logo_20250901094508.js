import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    client: String,
    imageUrl: { type: String, required: true },
    description: String,
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Logo", logoSchema);
