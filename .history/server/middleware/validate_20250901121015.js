import { validationResult } from "express-validator";


export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(422).json({ errors: result.array() });
  next();
};

export const normalizeProjectBody = (req, _res, next) => {
  const b = req.body || {};

  if (b.tags !== undefined) {
    if (Array.isArray(b.tags)) {
      req.body.tags = b.tags;
    } else if (typeof b.tags === "string") {
      try {
        // try JSON first
        const parsed = JSON.parse(b.tags);
        req.body.tags = Array.isArray(parsed)
          ? parsed
          : String(b.tags).split(",");
      } catch {
        req.body.tags = String(b.tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
    } else {
      req.body.tags = [];
    }
  }

  // links
  if (typeof b.links === "string") {
    try {
      req.body.links = JSON.parse(b.links);
    } catch {
      req.body.links = {};
    }
  }

  next();
};
