const express = require("express");
const router = express.Router();

const { registerUser, getUser } = require("../controllers/signUpController");

router.post("/signup", registerUser);

router.get("/login", getUser);

module.exports = router;
