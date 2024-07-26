const notFoundHandler = (req, res, next) => {
  const error = new Error(
    `${req.protocol}://${req.get("host")}${req.originalUrl} not found`
  );
  return res.notFound(error.message);
};

module.exports = notFoundHandler;
