const { UserServices } = require("../../services/v1");

const { AuthServices } = require("../../services/index").V1_SERVICES;

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await AuthServices.login(email, password);

      res.success(200, "Login successfully", user);
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const new_user = await UserServices.createUser(req.body);

      res.success(201, "User created", { user: new_user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
