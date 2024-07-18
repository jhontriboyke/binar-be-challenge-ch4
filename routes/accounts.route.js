const { Router } = require("express");
const router = Router();
const AccountsController = require("../controllers/accounts.controller");

// GET all accounts
router.get("/", AccountsController.getAllAccounts);

// GET an account by id
router.get("/:id", AccountsController.getAccountById);

// PUT an account by id
router.put("/:id", AccountsController.updateAccountById);

module.exports = router;
