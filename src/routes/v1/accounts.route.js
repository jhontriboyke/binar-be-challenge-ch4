const { Router } = require("express");
const validateAccount = require("../../middlewares/validations/account-validation.middleware");
const validateUpdateAccount = require("../../middlewares/validations/account-update-validation.middleware");
const { AccountController } = require("../../controllers").V1_CONTROLLER;

const router = Router();

/* GET all accounts */
router.get("/", AccountController.getAllAccounts);

/* GET an acount by id */
router.get("/:id", AccountController.getAccountById);

/* POST create an account */
router.post("/", validateAccount, AccountController.createAccount);

/* PUT to update an account by id */
router.put("/:id", validateUpdateAccount, AccountController.updateAccountById);

/* DELETE an account by id */
// router.delete("/:id", AccountController.deleteAccountById);

module.exports = router;
