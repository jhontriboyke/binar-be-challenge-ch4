const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  UnauthorizedError,
} = require("../../errors/customErrors");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    // Check if Authorization property exist in req.headers
    if (!header) {
      throw new NotFoundError("Authorization header not found");
    }

    const token = header.split(" ")[1];

    // Check if token exist
    if (!token) {
      throw new NotFoundError("Token not found");
    }

    try {
      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

      // Check if token valid
      const user = jwt.verify(token, JWT_SECRET_KEY);

      // If verify success, put user data to req.user object
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedError("Token expired", null);
      }

      if (error.name === "JsonWebTokenError") {
        throw new UnauthorizedError("Invalid token", null);
      }

      throw new Error("Token verification failed");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateToken;
