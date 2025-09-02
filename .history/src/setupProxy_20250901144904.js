// src/setupProxy.js
/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config();

// In dev, PIN your server to a fixed port (e.g. 5001) so the proxy never chases a moving target.
const RAW_TARGET =
  process.env.REACT_APP_API_PROXY_TARGET ||
  process.env.API_PROXY_TARGET ||
  "http://localhost:5001";

// normalize (remove trailing slashes)
const trim = (s = "") => String(s).replace(/\/+$/, "");
const API_TARGET = trim(RAW_TARGET);

// reusable proxy factory
const makeProxy = (label) =>
  createProxyMiddleware({
    target: API_TARGET,
    changeOrigin: true,
    // If your API runs under self-signed HTTPS in dev, keep this false:
    secure: false,
    // Forward x-forwarded-* headers
    xfwd: true,
    // Keep sockets alive & avoid occasional ECONNRESETs
    proxyTimeout: 30_000,
    timeout: 30_000,
    // Ensure cookies set by the API are valid for the CRA origin (localhost:3000)
    // If you're on 127.0.0.1:3000, change to "127.0.0.1"
    cookieDomainRewrite: {
      "*": "localhost",
    },
    // Helpful errors instead of silent 502s
    onError(err, req, res) {
      const code = err.code || err.message || "ProxyError";
      console.error(`[proxy] ${label} -> ${API_TARGET} failed:`, code);
      if (!res.headersSent) {
        res.writeHead(502, { "Content-Type": "application/json" });
      }
      res.end(JSON.stringify({ message: "Proxy error", error: code }));
    },
    // Turn to "debug" temporarily if you need noisy logs
    logLevel: process.env.NODE_ENV === "development" ? "warn" : "silent",
  });

module.exports = function (app) {
  console.log(`[proxy] /api     -> ${API_TARGET}`);
  console.log(`[proxy] /uploads -> ${API_TARGET}`);

  // Your axios uses /api/v1, so proxying /api covers it:
  app.use("/api", makeProxy("/api"));

  // Serve uploaded media from the API domain as well
  app.use("/uploads", makeProxy("/uploads"));
};
