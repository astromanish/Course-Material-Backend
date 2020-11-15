const User = require("../models/User");

const getAllUsersList = async (req, res) => {
  let usersList;
  try {
    usersList = await User.find({}).lean().exec();
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

  const newUser = new User({
    name,
    email,
    age,
    college,
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

module.exports = { getAllUsersList, createUser };
