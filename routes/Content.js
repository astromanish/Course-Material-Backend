const express = require("express");
const contentControllers = require("../controllers/Content");

const router = express.Router();

router.get("/", contentControllers.getAllContent);
router.post("/add", contentControllers.addContent);

module.exports = router;
