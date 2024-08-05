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
      const user_id = req.params.id;
      const user = await UserServices.getUserById(user_id);

      res.success(200, "User found", { user: user });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
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

      const new_user = await UserServices.createUser(
        user_obj,
        profile_obj,
        address_obj
      );

      res.success(201, "User created", { user: new_user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersControllers();
