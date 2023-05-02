const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    process.exit(1);
  }
}

module.exports = { connectDB };
