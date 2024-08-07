const UserController = require("./users.controller");
const AccountController = require("./accounts.controller");
const TransactionsController = require("./transactions.controller");
const AuthController = require("./auth.controller");

const V1_CONTROLLER = {
  UserController,
  AccountController,
  TransactionsController,
  AuthController,
};

module.exports = V1_CONTROLLER;
