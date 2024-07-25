const express = require("express");
const router = express.Router();

// Import routes
const USERS_ROUTES = require("./users.route");
const ACCOUNTS_ROUTES = require("./accounts.route");
const TRANSACTIONS_ROUTES = require("./transactions.route");

// Define route
router.use("/users", USERS_ROUTES);
router.use("/accounts", ACCOUNTS_ROUTES);
router.use("/transactions", TRANSACTIONS_ROUTES);

module.exports = router;
