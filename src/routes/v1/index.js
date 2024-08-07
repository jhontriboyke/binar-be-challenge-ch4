const express = require("express");
const router = express.Router();

// Import routes
const USERS_ROUTES = require("./users.route");
const ACCOUNTS_ROUTES = require("./accounts.route");
const TRANSACTIONS_ROUTES = require("./transactions.route");
const DOCS_ROUTE = require("./docs.route");
const AUTH_ROUTES = require("./auth.route");

// Define route
router.use("/users", USERS_ROUTES);
router.use("/accounts", ACCOUNTS_ROUTES);
router.use("/transactions", TRANSACTIONS_ROUTES);
router.use("/docs", DOCS_ROUTE);
router.use("/auth", AUTH_ROUTES);

module.exports = router;
