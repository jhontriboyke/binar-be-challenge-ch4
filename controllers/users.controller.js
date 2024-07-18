const pool = require("../db/index");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

class UsersController {
  async getAllUsers(req, res) {
    try {
      const results = await pool.query("SELECT * FROM users;");
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  }

  async getUserById(req, res) {
    try {
      const userID = req.params.id;

      const result = await pool.query("SELECT * FROM users WHERE id = $1", [
        userID,
      ]);

      if (result.rows.length === 0) {
        throw new Error("User not found");
      }

      res.status(200).json({ message: "User found", user: result.rows[0] });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      // Check email and password values
      if (!name || !email || !password) {
        return res
          .status(404)
          .json({ message: "Please provide valid name, email, and password" });
      }

      // Define salt and hash the password
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await pool.query(
        "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [uuidv4(), name, email, hashedPassword]
      );
      res.status(201).json({
        message: "User created",
        user: result.rows[0],
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async deleteUserById(req, res) {
    try {
      const userID = req.params.id;
      const result = await pool.query("SELECT FROM users WHERE id = $1", [
        userID,
      ]);

      if (result.rows.length === 0) {
        throw new Error("User not found");
      }

      await pool.query("DELETE FROM users WHERE id = $1", [userID]);
      res.status(200).json({ message: `User with id: ${userID} deleted` });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new UsersController();
