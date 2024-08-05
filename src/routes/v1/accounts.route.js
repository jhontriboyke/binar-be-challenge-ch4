const { Router } = require("express");
const validateAccount = require("../../middlewares/validations/account-validation.middleware");
const { AccountController } = require("../../controllers").V1_CONTROLLER;

const router = Router();

// GET all accounts
router.get("/", AccountController.getAllAccounts);

// GET an acount by id
router.get("/:id", AccountController.getAccountById);

// POST an account by id
router.post("/", validateAccount, AccountController.createAccount);

// PUT an account by id
// router.put("/:id", validateUpdateAccount, AccountController.updateAccountById);

// // DELET an account by id
// router.delete("/:id", AccountController.deleteAccountById);

module.exports = router;
