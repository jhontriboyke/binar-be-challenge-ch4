// Module import
const express = require("express");
const morgan = require("morgan");
require("module-alias/register");

// Import format middlewares
const responseFormat = require("./src/middlewares/responseFormat");
const notFoundHandler = require("./src/middlewares/notFound");

// Route import
const API_ROUTES = require("./src/routes");

// Define express app
const app = express();

// Using middlewares
app.use(responseFormat);
app.use(express.json());
app.use(morgan("dev"));

// Define routes
app.use("/api", API_ROUTES);

// Error handler middleware
app.use(notFoundHandler);

// Server Logger
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
