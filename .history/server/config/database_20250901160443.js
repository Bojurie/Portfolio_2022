import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "./env.js";

const isProd = NODE_ENV === "production";

// Map Mongoose readyState to human-readable string for health
const readyStateLabel = (rs) =>
  ({
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
    99: "uninitialized",
  }[rs] || String(rs));

export const connectDB = async () => {
  if (!MONGO_URI) throw new Error("Missing MONGO_URI");

  // Stricter query casting; recommended to reduce silent errors
  mongoose.set("strictQuery", true);

  // Helpful defaults
  mongoose.set("autoIndex", !isProd); // avoid index build at runtime in prod
  mongoose.set("bufferCommands", false);

  if (!isProd) {
    mongoose.connection.on("error", (e) =>
      console.error("Mongo connection error:", e.message)
    );
    mongoose.set("debug", false); // set true if you want verbose query logs
  }

  try {
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 10, // good default; adjust if needed
      minPoolSize: 0,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 20000,
      family: 4, // prefer IPv4 in dev to avoid odd IPv6 issues
      retryWrites: true,
    });
    console.log("✅ MongoDB connected:", sanitizeUri(MONGO_URI));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("   Check MONGO_URI:", sanitizeUri(MONGO_URI));
    throw err;
  }
};

export const getDbStatus = () => ({
  state: readyStateLabel(mongoose.connection.readyState),
  name: mongoose.connection.name || null,
  host: mongoose.connection.host || null,
  user: mongoose.connection.user || null,
});

const sanitizeUri = (uri) => {
  try {
    const u = new URL(uri);
    if (u.password) u.password = "***";
    return u.toString();
  } catch {
    // not a URL (e.g., SRV string without protocol)
    return uri.replace(/\/\/([^:]+):[^@]+@/, (_m, user) => `//${user}:***@`);
  }
};
