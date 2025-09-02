// middleware/sanitize.js
// Combine Mongo key sanitizing + XSS filtering without reassigning req.query.

import xss from "xss";

const BAD_KEY = /(\$)|(\.)/g;
const DANGEROUS_PROPS = new Set(["__proto__", "prototype", "constructor"]);

function isPlainObject(v) {
  return Object.prototype.toString.call(v) === "[object Object]";
}

function sanitizeValue(v, xssEnabled, xssOptions) {
  if (typeof v === "string") return xssEnabled ? xss(v, xssOptions) : v;
  return v;
}

function sanitizeObjectInPlace(obj, opts) {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const val = obj[i];
      if (typeof val === "object") sanitizeObjectInPlace(val, opts);
      else obj[i] = sanitizeValue(val, opts.xss, opts.xssOptions);
    }
    return;
  }

  if (isPlainObject(obj)) {
    for (const key of Object.keys(obj)) {
      // drop proto-pollution vectors
      if (DANGEROUS_PROPS.has(key)) {
        delete obj[key];
        continue;
      }

      // clean key names ($ and .)
      const safeKey =
        opts.replaceKeys !== false
          ? key.replace(BAD_KEY, opts.replaceWith)
          : key;

      // move if key changed
      if (safeKey !== key) {
        if (obj[safeKey] === undefined) obj[safeKey] = obj[key];
        delete obj[key];
      }

      const cur = obj[safeKey];
      if (typeof cur === "object") {
        sanitizeObjectInPlace(cur, opts);
      } else {
        obj[safeKey] = sanitizeValue(cur, opts.xss, opts.xssOptions);
      }
    }
  }
}

export function sanitizeInputs(options = {}) {
  const opts = {
    // key sanitizing
    replaceWith: "_",
    replaceKeys: true,
    // xss filtering
    xss: true,
    xssOptions: undefined,
    ...options,
  };

  return function sanitize(req, _res, next) {
    try {
      if (req.body && typeof req.body === "object")
        sanitizeObjectInPlace(req.body, opts);
      if (req.params && typeof req.params === "object")
        sanitizeObjectInPlace(req.params, opts);
      // IMPORTANT: mutate only; do not reassign req.query in Express 5
      if (req.query && typeof req.query === "object")
        sanitizeObjectInPlace(req.query, opts);
      next();
    } catch (e) {
      next(e);
    }
  };
}
