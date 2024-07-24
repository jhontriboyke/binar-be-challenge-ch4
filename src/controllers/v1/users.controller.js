const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../../models").V1_MODELS;

class UsersController {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.success(200, { users: users }, "Data retrieved successfully");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async getUserById(req, res) {
    try {
      const user_id = req.params.id;
      const user = await UserModel.getUserById(user_id);
      res.success(200, { user: user }, "Data retrieved successfully");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async createUser(req, res) {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        identity_type,
        identity_number,
        phone_number,
        nationality,
        job,
        street,
        village,
        postal_code,
        city,
        province,
        country,
      } = req.body;

      const salt = 10;
      const hashed_password = await bcrypt.hash(password, salt);

      const user = await UserModel.createUser(
        first_name,
        last_name,
        email,
        hashed_password
      );

      const profile = await UserModel.createProfile(
        user.id,
        identity_type,
        identity_number,
        phone_number,
        nationality,
        job
      );

      const address = await UserModel.createAddress(
        profile.id,
        street,
        village,
        postal_code,
        city,
        province,
        country
      );

      res.success(
        201,
        { user: user, profile: profile, address: address },
        "User created"
      );
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }
}

module.exports = new UsersController();
