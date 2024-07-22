const pool = require("../../../config/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../../../models/").V1_MODELS;

class UsersController {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUser();
      res.success(200, { users: users }, "Data retrieved successfully");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async getUserById(req, res) {
    try {
      const userID = req.params.id;
      const user = await UserModel.getUserById(userID);
      res.success({ user: user }, "User found");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async createUser(req, res) {
    try {
      // Check req.body props value
      const { name, email, password, identity_type, identity_number, address } =
        req.body;

      // Define salt and hash informations
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const hashedIdentityNumber = await bcrypt.hash(identity_number, salt);
      const hashedAddress = await bcrypt.hash(address, salt);

      // Insert into table users
      const user = await UserModel.createUser(
        uuidv4(),
        name,
        email,
        hashedPassword
      );

      console.log(user);

      // Get the user_id
      const user_id = user.id;

      console.log(user_id);

      // Insert into table profiles
      const profile = await UserModel.createProfile(
        uuidv4(),
        user_id,
        identity_type,
        hashedIdentityNumber,
        hashedAddress
      );

      res.success(
        201,
        { user: user, profile: profile },
        "User and profile created"
      );
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async updateUserById(req, res) {
    try {
      const userID = req.params.id;

      const { name, email, password, identity_type, identity_number, address } =
        req.body;

      // Hash informations
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const hashedIdentityNumber = await bcrypt.hash(identity_number, salt);
      const hashedAddress = await bcrypt.hash(address, salt);

      const user = await UserModel.updateUserById(
        userID,
        name,
        email,
        hashedPassword
      );

      const profile = await UserModel.updateProfileById(
        userID,
        identity_type,
        hashedIdentityNumber,
        hashedAddress
      );

      res.success(
        200,
        { user: user, profile: profile },
        "User and profile updated"
      );
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async deleteUserById(req, res) {
    try {
      const userID = req.params.id;

      const { user, profile } = await UserModel.deleteUserById(userID);

      res.success(200, { user: user, profile: profile }, "User deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UsersController();
