const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const { customErrorHandler } = require("./middleware/customErrorHandler");
const { connectDB } = require("./config/db");

connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/router"));
app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
