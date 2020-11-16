const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    branches: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", ContentSchema);
