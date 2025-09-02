import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export const connectDB = async () => {
  if (!MONGO_URI) throw new Error("Missing MONGO_URI");
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");
};
