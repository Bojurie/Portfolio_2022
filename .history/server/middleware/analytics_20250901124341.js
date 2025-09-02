// middleware/analytics.js
import { v4 as uuidv4 } from "uuid";
import geoip from "geoip-lite";
import PageView from "../models/PageView.js";

const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
const DEFAULT_COOKIE = "vid";

const getClientIp = (req) => {
  const xff = req.headers["x-forwarded-for"];
  const ip = Array.isArray(xff)
    ? xff[0]
    : (xff || "").split(",")[0] || req.ip || req.socket?.remoteAddress || "";
  return ip.replace("::ffff:", "");
};

const buildDoc = (req, visitorId) => {
  const ip = getClientIp(req);
  const geo = ip ? geoip.lookup(ip) : null;

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
 * Analytics middleware factory
 * Usage:
 *   app.use(analytics());
 *   router.post("/track", analytics({ trackApis: true }), (req,res)=>res.json({ok:true}));
 */
const analytics = (opts = {}) => {
  const {
    cookieName = DEFAULT_COOKIE,
    secureCookie = false,
    sampleRate = 1,
    trackApis = false,
  } = opts;

  return (req, res, next) => {
    try {
      if (!trackApis && req.path.startsWith("/api/")) return next();
      if (sampleRate < 1 && Math.random() > sampleRate) return next();

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

      setImmediate(async () => {
        try {
          await PageView.create(doc);
        } catch (err) {
          if (process.env.NODE_ENV !== "production") {
            console.error("Analytics save failed:", err.message);
          }
        }
      });

      req.analytics = { isNewVisitor, visitorId };
      next();
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Analytics middleware error:", err.message);
      }
      next();
    }
  };
};

export default analytics;
export const recordPageView = analytics;

/** Compatible handler for routes expecting a single controller */
export const trackEvent = (req, res, next) =>
  analytics({ trackApis: true })(req, res, () => res.json({ ok: true }));
