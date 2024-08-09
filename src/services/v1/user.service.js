const bcrypt = require("bcrypt");
const { UserModel, ProfileModel } = require("../../models").V1_MODELS;
const {
  NotFoundError,
  DuplicationError,
  UnauthorizedError,
} = require("../../errors/customErrors");

class UserServices {
  /* GET all users */
  async getAllUsers() {
    return await UserModel.getAllUsers();
  }

  /* GET user by id */
  async getUserById(user_id) {
    const user = await UserModel.getUserById(user_id);

    if (!user) {
      throw new NotFoundError("User not found", { user_id: user_id });
    }

    return user;
  }

  async getUserByIdWithRole(user_from_param, user_from_token) {
    if (user_from_token.role === "Admin") {
      // Check id from both user
      if (user_from_token.id === user_from_param.id) {
        return user_from_param;
      }

      // If not same
      return {
        id: user_from_param.id,
        email: user_from_param.email,
        first_name: user_from_param.first_name,
        last_name: user_from_param.last_name,
      };
    }

    if (user_from_token.role === "User") {
      // Check id from both user
      if (user_from_token.id !== user_from_param.id) {
        // If not same
        throw new UnauthorizedError("You cannot access this resource");
      }

      // if same
      return user_from_param;
    }
  }

  /* POST new user */
  async createUser(user_obj) {
    const { email, password } = user_obj;

    // Check if user already exist
    const existingUser = await UserModel.getUserByEmail(email);

    if (existingUser) {
      throw new DuplicationError("User already exist", { email: email });
    }

    try {
      // Hash password
      const hashed_password = await bcrypt.hash(password, 10);

      return await UserModel.createUser({
        ...user_obj,
        password: hashed_password,
      });
    } catch (error) {
      throw error;
    }
  }

  /* PUT to update a user by id */
  async updateUserById(user_id, user_obj, profile_obj, address_obj) {
    // Check if user exist by user_id
    const user = await UserModel.getUserById(user_id);

    if (!user) {
      throw new NotFoundError("User not found", { user_id: user_id });
    }

    const { email, password } = user_obj;
    // Check if user exist by email
    const existingUser = await UserModel.getUserByEmail(email);

    if (!existingUser) {
      throw new NotFoundError("User not found", {});
    }

    const { identity_number, phone_number, date_of_birth } = profile_obj;
    // Check if new identity_number already used by other user
    const identityNumber = await ProfileModel.getProfileByIdentityNumber(
      identity_number
    );

    if (identityNumber && identityNumber.user_id !== user_id) {
      throw new DuplicationError("Identity number already exist", {});
    }

    // Check if new phone_number already used by other user
    const phoneNumber = await ProfileModel.getProfileByPhoneNumber(
      phone_number
    );

    if (phoneNumber && phoneNumber.user_id !== user_id) {
      throw new DuplicationError("Phone number already used", {});
    }

    try {
      // Hash new password
      const hashed_password = await bcrypt.hash(password, 10);

      // Convert new date_of_birth to ISOString
      const converted_date_of_birth = new Date(date_of_birth).toISOString();

      return await UserModel.updateUser(
        user_id,
        {
          ...user_obj,
          password: hashed_password,
        },
        { ...profile_obj, date_of_birth: converted_date_of_birth },
        address_obj
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(user_id) {
    // Check if user exist
    const user = await this.getUserById(user_id);

    if (!user) {
      throw new NotFoundError("User not found", { user_id: user_id });
    }

    try {
      return await UserModel.deleteUser(user_id);
    } catch (error) {
      throw error;
    }
  }

  async upgradeUserById(user_id_from_param, user_id_from_token) {
    // Check user_id (s) match
    if (user_id_from_param !== user_id_from_token) {
      throw new UnauthorizedError(
        "You do not have permission to access this resource"
      );
    }

    // Check if user_id_from_param exist
    await this.getUserById(user_id_from_param);

    // Check if user_id_from_token exist
    await this.getUserById(user_id_from_token);

    try {
      const upgraded_user = await UserModel.upgradeRoleToAdmin(
        user_id_from_param
      );
      return {
        id: upgraded_user.id,
        email: upgraded_user.email,
        role: upgraded_user.role,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserServices();
