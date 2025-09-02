
const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config();

const trim = (s = "") => String(s).replace(/\/+$/, "");

// Use env override if you want, otherwise default to your server port (5001)
const RAW_TARGET =
  process.env.REACT_APP_API_PROXY_TARGET ||
  process.env.API_PROXY_TARGET ||
  "http://localhost:5001";

const API_TARGET = trim(RAW_TARGET);

const makeProxy = (label) =>
  createProxyMiddleware({
    target: API_TARGET,
    changeOrigin: true,
    secure: false, // ok for local HTTP/HTTPS with self-signed
    xfwd: true,
    proxyTimeout: 30_000,
    timeout: 30_000,
    cookieDomainRewrite: { "*": "localhost" }, // ensure cookie works on :3000
    onError(err, req, res) {
      const code = err.code || err.message || "ProxyError";
      console.error(`[proxy] ${label} -> ${API_TARGET} failed:`, code);
      if (!res.headersSent) {
        res.writeHead(502, { "Content-Type": "application/json" });
      }
      res.end(JSON.stringify({ message: "Proxy error", error: code }));
    },
    logLevel: process.env.NODE_ENV === "development" ? "warn" : "silent",
  });

module.exports = function (app) {
  console.log(`[proxy] /api     -> ${API_TARGET}`);
  console.log(`[proxy] /uploads -> ${API_TARGET}`);

  app.use("/api", makeProxy("/api")); // covers /api/v1/**
  app.use("/uploads", makeProxy("/uploads")); // serve media via API origin
};
