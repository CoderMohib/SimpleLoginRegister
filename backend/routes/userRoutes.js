const express = require("express");
const router = express.Router();
const login = require("../controllers/loginController");
const register = require("../controllers/registerController");
const getUserDate = require("../controllers/getUserController");
const authUser = require("../middleware/user.auth");
const getUserData = require("../controllers/getUserController");
router.post("/api/register", register);
router.post("/api/login", login);
router.get("/api/profile", authUser, getUserData);

module.exports = router;
