const express = require("express");

const userRoutes = require("../routes/User");
const collegeRoutes = require("../routes/College");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/college", collegeRoutes);

module.exports = router;
