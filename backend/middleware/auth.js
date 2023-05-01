const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = "";
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const tokenArr = req.headers.authorization.split(" ");
      if (tokenArr.length === 2) {
        token = tokenArr[1];

        //verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.mobileNumber != req.headers.mobilenumber) {
          throw new Error("Invalid token or missing mobileNumber in request");
        }
      } else {
        res.status(401);
        throw new Error("Missing Auth Token in Headers");
      }
    } else {
      res.status(401);
      throw new Error(
        "You are not authorised to send requests to this endpoint"
      );
    }
  } catch (error) {
    next(error);
  }
  next();
};

module.exports = { verifyToken };
