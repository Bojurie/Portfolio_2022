import http from "http";
import path from "path";
import net from "net";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import mongoose from "mongoose";

import { connectDB, getDbStatus } from "./config/database.js";
import { CORS_ORIGIN, NODE_ENV, PORT } from "./config/env.js";
import { notFound, errorHandler } from "./middleware/error.js";
import apiV1 from "./routes/index.js";

const app = express();
const isProd = NODE_ENV === "production";

/* ---------------------------- Trust & power ----------------------------- */
app.disable("x-powered-by");
app.set("trust proxy", 1);


const allowList = (CORS_ORIGIN || "*")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const allowAll = allowList.includes("*");

const corsOptions = {
  origin(origin, cb) {
    if (!origin || allowAll || allowList.includes(origin))
      return cb(null, true);
    return cb(new Error(`CORS: Origin ${origin} is not allowed`));
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Accept",
    "Content-Type",
    "Authorization",
    "X-Requested-With",
  ],
  optionsSuccessStatus: 204,
  maxAge: 86400, // cache preflight for 24h
};
app.use((req, res, next) => {
  res.vary("Origin");
  next();
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ----------------------------- Security --------------------------------- */
app.use(
  helmet({
    // Allow embedding / serving of images/videos from your CDN/origin as needed
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(hpp()); // protect from HTTP param pollution
app.use(mongoSanitize());
app.use(xss());

/* --------------------------- Parsers & perf ------------------------------ */
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(compression()); // gzip/deflate responses
if (!isProd) app.use(morgan("dev"));

/* --------------------------- Static /uploads ----------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    etag: true,
    lastModified: true,
    immutable: true,
    maxAge: "365d",
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  })
);

/* -------------------------------- Routes -------------------------------- */
app.get("/api/health", async (_req, res) => {
  const db = getDbStatus();
  res.json({
    ok: true,
    env: NODE_ENV,
    uptime: Math.round(process.uptime()),
    db,
  });
});

app.use("/api/v1", apiV1);

/* ------------------------------ Error MWs ------------------------------- */
app.use(notFound);
app.use(errorHandler);

/* --------------------- Dev helper: find free port ----------------------- */
const isPortFree = (port) =>
  new Promise((resolve) => {
    const tester = net
      .createServer()
      .once("error", () => resolve(false))
      .once("listening", () => tester.close(() => resolve(true)))
      .listen(port, "0.0.0.0");
  });

const findAvailablePort = async (startPort, attempts = 6) => {
  const base = Number(startPort) || 5000;
  for (let i = 0; i < attempts; i++) {
    const candidate = base + i;
    // eslint-disable-next-line no-await-in-loop
    if (await isPortFree(candidate)) return candidate;
  }
  return 0; // 0 = OS chooses
};

/* ----------------------------- Startup/Stop ----------------------------- */
const httpServer = http.createServer(app);
let server;

const start = async () => {
  try {
    await connectDB();

    let portToUse = Number(PORT) || 5000;
    if (!isProd) {
      const suggested = await findAvailablePort(portToUse, 6);
      portToUse = suggested || 0;
    }

    server = httpServer.listen(portToUse, "0.0.0.0", () => {
      const addr = server.address();
      const actualPort =
        typeof addr === "object" && addr ? addr.port : portToUse;
      console.log(
        `🚀 Server up on http://localhost:${actualPort} [${NODE_ENV}]`
      );
      if (!allowAll) console.log("🔒 CORS allowlist:", allowList.join(", "));
    });

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
    ? mongoose.connection.close(false)
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

// Fatal errors & signals
process.on("uncaughtException", (err) => shutdown("uncaughtException", err));
process.on("unhandledRejection", (err) => shutdown("unhandledRejection", err));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
// Nodemon restart
process.once("SIGUSR2", async () => {
  await shutdown("SIGUSR2");
  process.kill(process.pid, "SIGUSR2");
});

start();
