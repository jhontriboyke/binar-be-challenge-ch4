const express = require("express");
const router = express.Router();

// Import routes
const USERS_ROUTES = require("./users.route");

// Define route
router.use("/users", USERS_ROUTES);

module.exports = router;
