const responseFormat = (req, res, next) => {
  res.success = (code = 200, data, message) => {
    res.status(code).json({
      status: "success",
      message: message,
      data: data,
    });
  };

  res.error = (code, message, details) => {
    res.status(code).json({
      status: "error",
      message: message,
      error: {
        code: code,
        details: details,
      },
    });
  };

  res.fail = (code, data, message) => {
    res.status(code).json({
      status: "fail",
      message: message,
      data: data,
    });
  };

  next();
};

module.exports = responseFormat;
