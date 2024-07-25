const express = require("express");
const router = express.Router();

// Import routes
const USERS_ROUTES = require("./users.route");
const ACCOUNTS_ROUTES = require("./accounts.route");

// Define route
router.use("/users", USERS_ROUTES);
router.use("/accounts", ACCOUNTS_ROUTES);

module.exports = router;
