const { Router } = require("express");
const validateAccount = require("../../middlewares/validations/account-validation.middleware");
const validateUpdateAccount = require("../../middlewares/validations/account-update-validation.middleware");
const { AccountController } = require("../../controllers").V1_CONTROLLER;
const authenticateToken = require("../../middlewares/auths/authenticate-token.middleware");
const authorizeUser = require("../../middlewares/auths/authorize-user.middleware");
const Role = require("../../_helpers/role");

const router = Router();

/* GET all accounts */
router.get(
  "/",
  authenticateToken,
  authorizeUser([Role.Admin, Role.User]),
  AccountController.getAllAccounts
);

/* GET an acount by id */
router.get(
  "/:id",
  authenticateToken,
  authorizeUser([Role.Admin, Role.User]),
  AccountController.getAccountById
);

/* POST create an account */
router.post(
  "/",
  authenticateToken,
  authorizeUser([Role.User]),
  validateAccount,
  AccountController.createAccount
);

/* PUT to update an account by id */
router.put(
  "/:id",
  authenticateToken,
  authorizeUser(Role.User),
  validateUpdateAccount,
  AccountController.updateAccountById
);

/* DELETE an account by id */

module.exports = router;
