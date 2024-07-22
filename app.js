// Module import
const express = require("express");
const morgan = require("morgan");

// Middleware import
const responseFormat = require("./middlewares/responseFormat");

// Route import
const API_ROUTES = require("./routes");

// Define express app
const app = express();

// Using middlewares
app.use(responseFormat);
app.use(express.json());
app.use(morgan("dev"));

// Define routes
app.use("/api", API_ROUTES);

// Server Logger
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
