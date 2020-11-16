const Content = require("../models/Content");

const getAllContent = async (req, res) => {
  let content;
  try {
    content = await Content.find({}).lean().exec();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error occurred. Please try again later" });
  }

  return res.status(200).json({ content });
};

const addContent = async (req, res) => {
  let { link, course, degree, branches } = req.body;
  try {
    if (branches) branches = branches.split(",");
  } catch (error) {}

  const newContent = new Content({ link, course, degree, branches });

  try {
    await newContent.save();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error in adding content. Please try again later" });
  }

  return res.status(200).json({ message: "Added content sucessfully" });
};

module.exports = { getAllContent, addContent };
