const UserSchema = require("../models/signup");

const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, userName } = req.body;
    // Encrypting password by hashing
    const saltPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltPassword);

    const user = new UserSchema({
      fullName,
      email,
      password: hashedPassword,
      userName,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userData = await UserSchema.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  getUser,
};
