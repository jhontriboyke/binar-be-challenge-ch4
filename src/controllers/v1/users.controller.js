const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../../models").V1_MODELS;

class UsersController {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();

      if (users.length === 0) {
        return res.success(200, { users: users }, "Users data are empty");
      }

      res.success(200, { users: users }, "Data retrieved successfully");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async getUserById(req, res) {
    try {
      const user_id = req.params.id;
      const user = await UserModel.getUserById(user_id);

      if (user instanceof Error) {
        return res.fail(404, {}, user.message);
      }

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

  async updateUserById(req, res) {
    try {
      const user_id = req.params.id;
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

      const user = await UserModel.updateUserById(
        user_id,
        first_name,
        last_name,
        email,
        hashed_password
      );

      if (user.error) {
        return res.fail(404, { user_id: user_id }, user.error);
      }

      const profile = await UserModel.updateProfileByUserId(
        user_id,
        identity_type,
        identity_number,
        phone_number,
        nationality,
        job
      );

      const address = await UserModel.updateAddressByProfileId(
        profile.id,
        street,
        village,
        postal_code,
        city,
        province,
        country
      );

      res.success(
        200,
        { user: user, profile: profile, address: address },
        "User updated"
      );
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async deleteUserById(req, res) {
    try {
      const user_id = req.params.id;
      const user = await UserModel.deleteUser(user_id);

      if (user.error) {
        return res.fail(404, {}, user.error);
      }

      res.success(200, { user_id: user_id }, "User deleted");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }
}

module.exports = new UsersController();
