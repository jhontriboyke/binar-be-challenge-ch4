const { Router } = require("express");
const { AuthController } = require("../../controllers/index").V1_CONTROLLER;
const authenticateToken = require("../../middlewares/auths/authenticate-token.middleware");
const validateUserLogin = require("../../middlewares/validations/user-login-validation.middleware");
const router = Router();

router.post("/login", validateUserLogin, AuthController.login);

router.post("/register");

router.post("/authenticate", authenticateToken, (req, res) => {
  res.success(200, "Authenticated", { user: req.user });
});

module.exports = router;
