import mongoose from "mongoose";

const pvSchema = new mongoose.Schema(
  {
    path: { type: String, index: true },
    referrer: String,
    ip: String,
    ua: String,
    country: String,
    city: String,
    ll: [Number], 
    utm_source: String,
    utm_medium: String,
    utm_campaign: String,
    visitorId: String, 
  },
  { timestamps: true }
);

pvSchema.index({ createdAt: 1 });
pvSchema.index({ visitorId: 1, createdAt: 1 });

export default mongoose.model("PageView", pvSchema);
