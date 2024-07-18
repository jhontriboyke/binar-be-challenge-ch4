const express = require("express");
const router = express.Router();

// Import routes
const usersRoutes = require("./users.route");
const accountsRoutes = require("./accounts.route");
const transactionsRoutes = require("./transactions.route");

// Define route
router.use("/users", usersRoutes);
router.use("/accounts", accountsRoutes);
router.use("/transactions", transactionsRoutes);

module.exports = router;
