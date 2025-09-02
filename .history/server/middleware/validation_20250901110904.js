// ESM validate helper built on express-validator
import { validationResult } from "express-validator";

export const runValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  return res.status(422).json({ errors: result.array() });
};

// usage: router.post("/path", validate([body("field").isEmail()]), handler)
export const validate = (rules = []) => [...rules, runValidation];

export default validate;
