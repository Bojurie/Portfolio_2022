import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    ipAddress: String,
    country: String,
    region: String,
    city: String,
    timezone: String,
    browser: String,
    os: String,
    device: String,
    page: String,
    referrer: String,
    duration: Number,
    isReturning: { type: Boolean, default: false },
  },
  { timestamps: true }
);

visitorSchema.index({ createdAt: 1 });
visitorSchema.index({ ipAddress: 1, createdAt: 1 });

export default mongoose.model("Visitor", visitorSchema);
