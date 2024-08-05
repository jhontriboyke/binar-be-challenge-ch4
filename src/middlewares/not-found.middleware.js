const notFoundHandler = (req, res, next) => {
  const error = new Error(
    `${req.protocol}://${req.get("host")}${req.originalUrl} not found`
  );
  return res.error(404, error.message, null);
};

module.exports = notFoundHandler;
