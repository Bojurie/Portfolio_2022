const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");

const { resendVerificationEmail } = require("../controllers/authController");


router.use("/auth", require("./authRoutes"));
router.use("/projects", projectRoutes);
router.use("/logos", logoRoutes);
router.use("/reviews", reviewRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/dashboard", dashboardRoutes);

router.post("/resend-verification", asyncHandler(resendVerificationEmail));

module.exports = router;
