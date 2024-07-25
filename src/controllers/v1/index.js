const UserController = require("./users.controller");
const AccountController = require("./accounts.controller");
const TransactionsController = require("./transactions.controller");

const V1_CONTROLLER = {
  UserController,
  AccountController,
  TransactionsController,
};

module.exports = V1_CONTROLLER;
