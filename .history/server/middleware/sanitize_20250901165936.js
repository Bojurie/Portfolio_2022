// middleware/sanitize.js
// Express 5 safe in-place sanitizer for req.body / req.params / req.query

const BAD_KEY = /(\$)|(\.)/g;
const DANGEROUS_PROPS = new Set(["__proto__", "prototype", "constructor"]);

function isPlainObject(v) {
  return Object.prototype.toString.call(v) === "[object Object]";
}

function sanitizeObjectInPlace(obj, replaceWith = "_") {
  if (!obj || typeof obj !== "object") return;

  // Arrays: sanitize each element
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      sanitizeObjectInPlace(obj[i], replaceWith);
    }
    return;
  }

  // Plain objects: rename bad keys and recurse
  if (isPlainObject(obj)) {
    for (const key of Object.keys(obj)) {
      const value = obj[key];

      // Block dangerous prototypes entirely
      if (DANGEROUS_PROPS.has(key)) {
        delete obj[key];
        continue;
      }

      // Replace $ and . in keys
      const safeKey = key.replace(BAD_KEY, replaceWith);
      if (safeKey !== key) {
        // Avoid overwriting existing keys
        if (obj[safeKey] === undefined) obj[safeKey] = value;
        delete obj[key];
      }

      // Recurse into values
      sanitizeObjectInPlace(obj[safeKey], replaceWith);
    }
  }
}

// Express middleware
export function sanitizeInputs(replaceWith = "_") {
  return function sanitize(req, _res, next) {
    try {
      if (req.body && typeof req.body === "object") {
        sanitizeObjectInPlace(req.body, replaceWith);
      }
      if (req.params && typeof req.params === "object") {
        sanitizeObjectInPlace(req.params, replaceWith);
      }
      // IMPORTANT: mutate req.query IN PLACE (do not reassign)
      if (req.query && typeof req.query === "object") {
        sanitizeObjectInPlace(req.query, replaceWith);
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}
