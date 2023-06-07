const express = require("express");
const router = express.Router();

const { registerUser, getUser } = require("../controllers/signUpController");
const { handleLogin } = require("../controllers/loginController");

router.post("/signup", registerUser);

router.post("/login", handleLogin);

module.exports = router;
