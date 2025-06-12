const express = require("express");
const router = express.Router();
const login = require("../controllers/loginController");
const register = require("../controllers/registerController");
const getUser = require("../controllers/getUserController");
const authUser = require("../middleware/user.auth");
router.post("/api/register", register);
router.post("/api/login", login);
router.get("/api/profile", authUser, getUser);

module.exports = router;
