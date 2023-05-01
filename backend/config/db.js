const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log((await conn).connection.host);
  } catch (error) {
    process.exit(1);
  }
}

module.exports = { connectDB };
