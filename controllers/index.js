const UserController = require("./v1/users");
const AccountsController = require("./v1/accounts");
const TransactionsController = require("./v1/transactions");

const V1_CONTROLLER = {
  UserController,
  AccountsController,
  TransactionsController,
};

module.exports = {
  V1_CONTROLLER,
};
