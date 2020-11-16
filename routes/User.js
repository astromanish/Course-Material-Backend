const express = require("express");

const userControllers = require("../controllers/User");

const router = express.Router();

router.get("/", userControllers.getAllUsersList);
router.post("/create", userControllers.createUser);
router.post("/login", userControllers.loginUser);

module.exports = router;
