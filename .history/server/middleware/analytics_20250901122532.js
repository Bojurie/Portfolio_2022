// server/middleware/analytics.js
import { v4 as uuidv4 } from "uuid";
import geoip from "geoip-lite";
import PageView from "../models/PageView.js";

const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
const DEFAULT_COOKIE = "vid"; // public (not httpOnly) so client can reuse if needed

const getClientIp = (req) => {
  // honor reverse proxy headers; Express trust proxy is set in server.js
  const xff = req.headers["x-forwarded-for"];
  const ip = Array.isArray(xff)
    ? xff[0]
    : (xff || "").split(",")[0] || req.ip || req.socket?.remoteAddress || "";
  return ip.replace("::ffff:", "");
};

const buildDoc = (req, visitorId) => {
  const ip = getClientIp(req);
  const geo = ip ? geoip.lookup(ip) : null;

  // Accept path/referrer/utm from query OR body, fallback to headers
  const q = req.query || {};
  const b = req.body && typeof req.body === "object" ? req.body : {};
  const path = b.path || q.path || req.originalUrl || req.url;
  const referrer =
    b.referrer || q.ref || q.referrer || req.get("referer") || "";

  return {
    path,
    referrer,
    ip,
    ua: req.get("user-agent") || "",
    country: geo?.country,
    city: geo?.city,
    ll: geo?.ll,
    utm_source: b.utm_source || q.utm_source || "",
    utm_medium: b.utm_medium || q.utm_medium || "",
    utm_campaign: b.utm_campaign || q.utm_campaign || "",
    visitorId,
  };
};

/**
 * Analytics middleware.
 *  - Sets a visitor cookie if absent
 *  - Collects minimal request metadata
 *  - Persists PageView asynchronously (never blocks response)
 *
 * Usage (global):   app.use(analytics());
 * Usage (endpoint): router.post("/track", analytics({ endpoint: true }), (req,res)=>res.json({ok:true}));
 */
const analytics = (opts = {}) => {
  const {
    cookieName = DEFAULT_COOKIE,
    secureCookie = false, // set true if you are strictly on HTTPS
    sampleRate = 1, // a value 0..1 (1 = log all)
    trackApis = false, // set true if you also want to record /api/* paths
  } = opts;

  return (req, res, next) => {
    try {
      // If we don't track API traffic, skip /api/* to avoid double counting
      if (!trackApis && req.path.startsWith("/api/")) return next();

      // Sampling
      if (sampleRate < 1 && Math.random() > sampleRate) return next();

      // Public (non-httpOnly) cookie so the frontend can read and reuse
      let visitorId = req.cookies?.[cookieName];
      const isNewVisitor = !visitorId;
      if (!visitorId) {
        visitorId = uuidv4();
        res.cookie(cookieName, visitorId, {
          maxAge: ONE_YEAR_MS,
          httpOnly: false,
          sameSite: "lax",
          secure: secureCookie,
        });
      }

      const doc = buildDoc(req, visitorId);

      // Persist outside the critical path
      setImmediate(async () => {
        try {
          await PageView.create(doc);
        } catch (err) {
          // Never crash request due to analytics
          if (process.env.NODE_ENV !== "production") {
            console.error("Analytics save failed:", err.message);
          }
        }
      });

      // Optionally expose flags to downstream handlers
      req.analytics = { isNewVisitor, visitorId };

      return next();
    } catch (err) {
      // Also never block on analytics errors
      if (process.env.NODE_ENV !== "production") {
        console.error("Analytics middleware error:", err.message);
      }
      return next();
    }
  };
};

export default analytics;

/* Named export if you prefer explicit names */
export const recordPageView = analytics;
