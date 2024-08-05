const bcrypt = require("bcrypt");
const { UserModel, ProfileModel } = require("../../models").V1_MODELS;
const {
  NotFoundError,
  DuplicationError,
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

  /* POST new user */
  async createUser(user_obj, profile_obj, address_obj) {
    const { email, password } = user_obj;

    // Check if user already exist
    const existingUser = await UserModel.getUserByEmail(email);

    if (existingUser) {
      throw new DuplicationError("User already exist", { email: email });
    }

    const { identity_number, phone_number, date_of_birth } = profile_obj;

    // Check if identity_number already exist
    const identityNumber = await ProfileModel.getProfileByIdentityNumber(
      identity_number
    );

    if (identityNumber) {
      throw new DuplicationError("Identity number already exist", {});
    }

    // Check if phone_number already exist
    const phoneNumber = await ProfileModel.getProfileByPhoneNumber(
      phone_number
    );

    if (phoneNumber) {
      throw new DuplicationError("Phone number already exist", {});
    }

    let new_user;
    try {
      // Hash password
      const hashed_password = await bcrypt.hash(password, 10);

      // Convert date_of_birth to ISOString
      const converted_date_of_birth = new Date(date_of_birth).toISOString();

      new_user = await UserModel.createUser(
        {
          ...user_obj,
          password: hashed_password,
        },
        {
          ...profile_obj,
          date_of_birth: converted_date_of_birth,
        },
        address_obj
      );
      return new_user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserServices();
