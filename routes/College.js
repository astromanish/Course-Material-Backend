const express = require("express");

const collegeControllers = require("../controllers/College");

const router = express.Router();

router.get("/", collegeControllers.getAllCollegesList);
router.post("/add", collegeControllers.addCollege);

module.exports = router;
