const express = require("express");

const userRoutes = require("../routes/User");
const collegeRoutes = require("../routes/College");
const contentRoutes = require("../routes/Content");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/college", collegeRoutes);
router.use("/content", contentRoutes);

module.exports = router;
