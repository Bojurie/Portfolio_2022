import http from "http";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import mongoose from "mongoose";

import { connectDB } from "./config/database";
import { CORS_ORIGIN, NODE_ENV, PORT } from "./config/env.js";
import { notFound, errorHandler } from "./middleware/error.js";
import apiV1 from "./routes/index.js";

const app = express();

/* ---------------------------- Security & CORS ---------------------------- */

app.disable("x-powered-by");
app.set("trust proxy", 1);

const allowList = (CORS_ORIGIN || "*")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const allowAll = allowList.includes("*");

app.use(helmet());
app.use(
  cors({
    origin(origin, cb) {
      // allow REST tools or same-origin requests with no 'Origin' header
      if (!origin || allowAll || allowList.includes(origin))
        return cb(null, true);
      return cb(new Error(`CORS: Origin ${origin} is not allowed`));
    },
    credentials: true,
  })
);

/* ------------------------------- Parsers -------------------------------- */

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
if (NODE_ENV !== "production") app.use(morgan("dev"));

/* -------------------------------- Routes -------------------------------- */

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/v1", apiV1);

/* ------------------------------ Error MWs ------------------------------- */

app.use(notFound);
app.use(errorHandler);

/* ----------------------------- Startup/Stop ----------------------------- */

const httpServer = http.createServer(app);

let server; // will hold the running HTTP server

const start = async () => {
  try {
    await connectDB();
    server = httpServer.listen(PORT, () => {
      console.log(`🚀 Server up on http://localhost:${PORT} [${NODE_ENV}]`);
      if (!allowAll) console.log("🔒 CORS allowlist:", allowList.join(", "));
    });

    // Optional: handle server-level errors (e.g., EADDRINUSE)
    server.on("error", (err) => {
      console.error("HTTP server error:", err);
      shutdown("server-error", err);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

const closeHttpServer = () =>
  new Promise((resolve) => {
    if (!server) return resolve();
    server.close(() => resolve());
  });

const closeMongo = () =>
  mongoose.connection.readyState
    ? mongoose.connection.close(false) // false = don't force close active connections
    : Promise.resolve();

const shutdown = async (reason, err) => {
  const stamp = new Date().toISOString();
  console.log(`\n🛑 ${stamp} — Shutting down (${reason})`);
  if (err) console.error(err);

  try {
    await Promise.race([
      (async () => {
        await closeHttpServer();
        await closeMongo();
      })(),
      new Promise((_, rej) =>
        setTimeout(() => rej(new Error("Shutdown timeout")), 10000)
      ),
    ]);
    console.log("✅ Cleanup complete. Bye!");
    process.exit(err ? 1 : 0);
  } catch (e) {
    console.error("Force exit due to cleanup error/timeout:", e);
    process.exit(1);
  }
};

// Handle fatal errors & OS signals
process.on("uncaughtException", (err) => shutdown("uncaughtException", err));
process.on("unhandledRejection", (err) => shutdown("unhandledRejection", err));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start();
