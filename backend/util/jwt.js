const jwt = require("jsonwebtoken");

const jwtTokenGenerator = (mobileNumber) => {
  return jwt.sign({ mobileNumber }, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

module.exports = { jwtTokenGenerator };
