const {
  NotFoundError,
  ValidationError,
  DuplicationError,
} = require("../errors/customErrors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.error(err.statusCode, err.message, err.data);
  }

  if (err instanceof DuplicationError) {
    return res.error(err.statusCode, err.message, err.data);
  }

  if (err instanceof ValidationError) {
    return res.fail(err.statusCode, err.message, err.data);
  }

  // Default
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Internal Error";
  res.error(statusCode, message, {});
  // res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
