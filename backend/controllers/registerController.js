const bcrypt = require("bcryptjs");
const User = require("../model/userModel.js");

const register = async (req, res) => {
  try {
    const { username, email, password, age, dateOfBirth, gender } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      age,
      dateOfBirth,
      gender,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      insertedId: newUser._id,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};
module.exports = register;
