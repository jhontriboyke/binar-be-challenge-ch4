const { Router } = require("express");
const { AuthController } = require("../../controllers/index").V1_CONTROLLER;
const validateUserLogin = require("../../middlewares/validations/user-login-validation.middleware");
const router = Router();

router.post("/login", validateUserLogin, AuthController.login);

router.post("/register");

module.exports = router;
