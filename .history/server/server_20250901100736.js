import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import { CORS_ORIGIN, NODE_ENV } from "./config/env.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import logoRoutes from "./routes/logoRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
if (NODE_ENV !== "production") app.use(morgan("dev"));

// routes
  app.use("/api/v1", require("./routes"));

// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// errors
app.use(notFound);
app.use(errorHandler);

export default app;
