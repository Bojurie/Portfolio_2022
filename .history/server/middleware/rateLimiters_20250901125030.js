import rateLimit, { ipKeyGenerator } from "express-rate-limit";


export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
  keyGenerator: ipKeyGenerator, // ✅ required by v7+ for IPv6 correctness
});
