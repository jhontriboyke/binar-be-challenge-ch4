const { Router } = require("express");
const AccountsController = require("../controllers/accounts.controller");
const checkIfExistsAllRows = require("../middlewares/checkIfExistsAllRows");
const { validateAccount } = require("../middlewares/validateInputs");

const router = Router();

// GET all accounts
router.get(
  "/",
  checkIfExistsAllRows("bank_accounts", "accounts"),
  AccountsController.getAllAccounts
);

// GET an account by id
router.get("/:id", AccountsController.getAccountById);

// POST an account
router.post("/", validateAccount, AccountsController.createAccount);

// PUT an account by id
router.put("/:id", AccountsController.updateAccountById);

// Deletan account by id
router.delete("/:id", AccountsController.deleteAccountById);

module.exports = router;
