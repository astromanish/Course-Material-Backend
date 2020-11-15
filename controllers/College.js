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

const addCollege = async (req, res) => {
  let { name, pincode } = req.body;  
  let isExisting;
  try {
    isExisting = await College.findOne({ name, pincode }).lean().exec();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server down. Please try again later" });
  }

  if (isExisting) {
    return res.status(409).json({ error: "College already exists. " });
  }

  const newCollege = new College({ name, pincode });

  try {
    await newCollege.save();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Unable to add college. Please try again later" });
  }

  return res.status(200).json({ message: "Added college successfully" });
};

module.exports = { getAllCollegesList, addCollege };
