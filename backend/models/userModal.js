const mongoose = require("mongoose");

const userScheme = mongoose.Schema(
  {
    mobileNumber: {
      type: Number,
      required: [true, "Please provide a mobileNumber"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    firstName: {
      type: String,
      required: [true, "Please provide your firstName"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userScheme);
