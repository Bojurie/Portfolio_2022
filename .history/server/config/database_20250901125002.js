import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "./env.js";

export const connectDB = async () => {
  if (!MONGO_URI) throw new Error("Missing MONGO_URI");

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 20000,
      family: 4,
    });

    console.log("✅ MongoDB connected:", sanitizeUri(MONGO_URI));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error(
      "   Make sure MongoDB is running and your MONGO_URI is correct:",
      sanitizeUri(MONGO_URI)
    );
    throw err;
  }

  if (NODE_ENV !== "production") {
    mongoose.connection.on("error", (e) =>
      console.error("Mongo connection error:", e.message)
    );
  }
};

const sanitizeUri = (uri) => {
  try {
    const u = new URL(uri);
    if (u.password) u.password = "***";
    return u.toString();
  } catch {
    return uri;
  }
};
