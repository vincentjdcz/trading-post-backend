const express = require("express");
const {signup, login, logout} = require("../../controllers/auth/controller")
const router = express.Router();

//Create new user
router.post("/signup", signup);

//Login user
router.post("/login", login);

//Logout user
router.post("/logout", logout);

module.exports = router;