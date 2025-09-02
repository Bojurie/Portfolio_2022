const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");

const { resendVerificationEmail } = require("../controllers/authController");


router.use("/auth", require("./authRoutes"));
router.use("/projects", require("./projects"));
router.use("/logos", require("./logoRoutes"));
router.use("/reviews", require("./reviews"));
router.use("/analytics", require("./analytics"));
router.use("/dashboard", require("./dashboard"));

router.post("/resend-verification", asyncHandler(resendVerificationEmail));

module.exports = router;
