const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = require("../model/userModel");

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "user doesnot exist" });
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword)
      return res.status(404).json({ message: "password incorrect" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user alreday exist" });
    if (password !== confirmPassword) {
      return res.status(401).json({ message: "password doesnot match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await user.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  signIn,
  signUp,
};
