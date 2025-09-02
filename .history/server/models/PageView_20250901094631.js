import mongoose from "mongoose";

const pvSchema = new mongoose.Schema(
  {
    path: { type: String, index: true },
    referrer: String,
    ip: String,
    ua: String,
    country: String,
    city: String,
    ll: [Number], // [lat, lng]
    utm_source: String,
    utm_medium: String,
    utm_campaign: String,
    visitorId: String, // client-set uuid cookie to identify return visits
  },
  { timestamps: true }
);

pvSchema.index({ createdAt: 1 });
pvSchema.index({ visitorId: 1, createdAt: 1 });

export default mongoose.model("PageView", pvSchema);
