const express = require("express");
const router = express.Router();

// Import routes
const USERS_ROUTES = require("./users/");
const ACCOUNTS_ROUTES = require("./accounts/");
const TRANSACTIONS_ROUTES = require("./transactions/");

// Define route
router.use("/users", USERS_ROUTES);
router.use("/accounts", ACCOUNTS_ROUTES);
router.use("/transactions", TRANSACTIONS_ROUTES);

module.exports = router;
