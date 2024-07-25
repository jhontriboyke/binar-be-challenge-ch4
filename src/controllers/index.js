const UserController = require("./v1/users.controller");
const AccountController = require("./v1/accounts.controller");

const V1_CONTROLLER = {
  UserController,
  AccountController,
};

module.exports = {
  V1_CONTROLLER,
};
