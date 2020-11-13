const College = require("../models/College");

const getAllCollegesList = async (req, res) => {
  let collegesList;
  try {
    collegesList = await College.find({}).lean().exec();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server down. Please try again later." });
  }

  return res.status(200).json({ collegesList });
};

module.exports = { getAllCollegesList };
