const responseFormat = (req, res, next) => {
  res.success = (statusCode = 200, message, data = null) => {
    res.status(statusCode).json({
      status: "success",
      message: message,
      data: data,
    });
  };

  res.error = (statusCode, message, data = null) => {
    res.status(statusCode).json({
      status: "error",
      message: message,
      status_code: statusCode,
      data: data,
    });
  };

  res.fail = (statusCode, message, data = null) => {
    res.status(statusCode).json({
      status: "fail",
      message: message,
      status_code: statusCode,
      data: data,
    });
  };

  next();
};

module.exports = responseFormat;
