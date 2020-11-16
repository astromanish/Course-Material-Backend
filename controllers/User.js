const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authHelpers = require("../helpers/auth");

const getAllUsersList = async (req, res) => {
  let usersList;
  try {
    usersList = await User.find({}).lean().select("-password").exec();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server down. Please try again later." });
  }

  return res.status(200).json({ usersList });
};

const createUser = async (req, res) => {
  const { name, email, age, college } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email }).lean().exec();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server down. Please try again later" });
  }

  if (existingUser) {
    return res.status(409).json({ error: "User with email already exists" });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 12);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error in creating you account. Please try again later" });
  }

  const newUser = new User({
    name,
    email,
    age,
    college,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Unable to create User. Please try again later" });
  }

  return res.status(200).json({ message: "Created your account succesfully" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email }).lean().exec();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server down. Please try again later" });
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ error: "No such user found. Please register yourself" });
  }

  let validUser;
  try {
    validUser = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
  if (!validUser) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  let token = authHelpers.createToken({
    id: existingUser._id,
    email: existingUser.email,
    name: existingUser.name,
  });

  return res.status(200).json({ message: "Logged you in", token });
};

module.exports = { getAllUsersList, createUser, loginUser };
