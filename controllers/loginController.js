const UserSchema = require("../models/signup");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const handleLogin = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password)
    return res.status(400).json("Username and Password is required");

  const foundUser = await UserSchema.findOne({ userName });

  if (!foundUser)
    return res.status(401).json("User not Found. Please Register to Login");

  const isPasswordMatching = await bcrypt.compare(password, foundUser.password);

  if (isPasswordMatching) {
    // JWT Authentication goes here
    const accessToken = jwt.sign(
      { userName: foundUser.userName },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "15m" }
    );
    // TODO: Refresh Token Implementation
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.status(201).json({ ...foundUser._doc });
  } else {
    return res.status(401).json("Invalid Credentials");
  }
};

module.exports = {
  handleLogin,
};
