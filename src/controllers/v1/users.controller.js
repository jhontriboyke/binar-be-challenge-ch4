const { UnauthorizedError } = require("../../errors/customErrors");

const { UserServices } = require("../../services/").V1_SERVICES;
class UsersControllers {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserServices.getAllUsers();

      if (users.length === 0) {
        return res.success(200, "Users data are empty", { users: users });
      }

      res.success(200, "Data retrieved successfully", { users: users });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user_id_from_param = req.params.id;
      const user_id_from_token = req.user.id;

      const user_from_param = await UserServices.getUserById(
        user_id_from_param
      );

      const user_from_token = await UserServices.getUserById(
        user_id_from_token
      );

      const user = await UserServices.getUserByIdWithRole(
        user_from_param,
        user_from_token
      );

      res.success(200, "User found", { user: user });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const new_user = await UserServices.createUser(req.body);

      res.success(201, "User created", { user: new_user });
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const user_id = req.params.id;

      const {
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        gender,
        identity_type,
        identity_number,
        phone_number,
        occupation,
        nationality,
        street,
        village,
        zip_code,
        city,
        province,
        country,
      } = req.body;

      const user_obj = {
        first_name,
        last_name,
        email,
        password,
      };

      const profile_obj = {
        date_of_birth,
        gender,
        identity_type,
        identity_number,
        phone_number,
        occupation,
        nationality,
      };

      const address_obj = {
        street,
        village,
        zip_code,
        city,
        province,
        country,
      };

      const updated_user = await UserServices.updateUserById(
        user_id,
        user_obj,
        profile_obj,
        address_obj
      );

      res.success(200, "User updated", { user: updated_user });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserById(req, res, next) {
    try {
      const user_id = req.params.id;

      const deleted_user = await UserServices.deleteUserById(user_id);

      res.success(200, "User deleted", { user: deleted_user });
    } catch (error) {
      next(error);
    }
  }

  async upgradeUserRoleById(req, res, next) {
    try {
      const user_id_from_param = req.params.id;
      const user_id_from_token = req.user.id;

      const upgraded_user = await UserServices.upgradeUserById(
        user_id_from_param,
        user_id_from_token
      );

      res.success(201, "User role upgraded", { user: upgraded_user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersControllers();
