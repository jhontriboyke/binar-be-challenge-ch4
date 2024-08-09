const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../../errors/customErrors");
const { UserModel } = require("../../models/index").V1_MODELS;
require("dotenv").config();

class AuthServices {
  async login(email, password) {
    // Check if user exist by email
    const user = await UserModel.getUserByEmail(email);

    if (!user) {
      throw new NotFoundError("Email or your password incorrect", null);
    }

    // Compare password with db password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (user.role !== "Admin" && !isPasswordMatch) {
      throw new NotFoundError("Email or your password incorrect", null);
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    // Generate JWT token
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

    return {
      token,
    };
  }
}

module.exports = new AuthServices();
