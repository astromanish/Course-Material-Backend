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

module.exports = { getAllUsersList };
