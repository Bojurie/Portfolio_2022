const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config();


const API_TARGET =
  process.env.REACT_APP_API_PROXY_TARGET ||
  process.env.API_PROXY_TARGET ||
  "http://localhost:5001";

const makeProxy = (pathLabel) =>
  createProxyMiddleware({
    target: API_TARGET,
    changeOrigin: true,
    xfwd: true, // add X-Forwarded-* headers
    proxyTimeout: 30000,
    timeout: 30000,
    cookieDomainRewrite: {
      "*": "localhost", 
    },
    onError(err, req, res) {
      console.error(
        `[proxy] ${pathLabel} → ${API_TARGET} error:`,
        err.code || err.message
      );
      if (!res.headersSent) {
        res.writeHead(502, { "Content-Type": "application/json" });
      }
      res.end(
        JSON.stringify({
          message: "Proxy error",
          detail: err.code || String(err),
        })
      );
    },
    logLevel: process.env.NODE_ENV === "development" ? "warn" : "silent",
  });

module.exports = function (app) {
  console.log(`[proxy] forwarding /api     → ${API_TARGET}`);
  console.log(`[proxy] forwarding /uploads → ${API_TARGET}`);

  app.use("/api", makeProxy("/api"));
  app.use("/uploads", makeProxy("/uploads"));
};
