const customErrorHandler = (err, req, res, next) => {
  let currentMode = process.env.NODE_ENV;
  let statusCode = 400;
  if (currentMode == "production") {
    res.status(statusCode).json({ message: err.message });
  } else {
    res.status(statusCode).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports = { customErrorHandler };
