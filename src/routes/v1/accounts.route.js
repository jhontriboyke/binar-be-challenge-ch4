const { Router } = require("express");
const {
  validateAccount,
  validateUpdateAccount,
} = require("../../middlewares/validateInputs");
const { AccountController } = require("../../controllers").V1_CONTROLLER;

const router = Router();

router.get("/", AccountController.getAllAccounts);

router.get("/:id", AccountController.getAccountById);

router.put("/:id", validateUpdateAccount, AccountController.updateAccountById);

router.post("/", validateAccount, AccountController.createUser);

module.exports = router;
