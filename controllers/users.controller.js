const pool = require("../db/index");
const bcrypt = require("bcrypt");
const hash = require("../utils/hash");
const { v4: uuidv4 } = require("uuid");

class UsersController {
  async getAllUsers(req, res) {
    try {
      const results = await pool.query("SELECT id, name, email FROM users;");

      res.status(200).json({ message: "Success", users: results.rows });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const userID = req.params.id;
      // SELECT users table and join with profiles table
      const result = await pool.query(
        `
      SELECT
        u.id,
        u.name,
        u.email,
        p.identity_type,
        p.identity_number,
        p.address
      FROM
        users u
      JOIN
        profiles p
      ON  
        u.id = p.user_id
      WHERE
        u.id = $1;
      `,
        [userID]
      );
      res.status(200).json({ message: "User found", user: result.rows[0] });
    } catch (error) {
      res.status(500).json({ message: error.message });
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
      const resultUsersTable = await pool.query(
        "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [uuidv4(), name, email, hashedPassword]
      );

      // Get the user_id
      const user_id = resultUsersTable.rows[0].id;

      // Insert into table profiles
      const resultProfilesTable = await pool.query(
        "INSERT INTO profiles (id, user_id, identity_type, identity_number, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [uuidv4(), user_id, identity_type, hashedIdentityNumber, hashedAddress]
      );

      res.status(201).json({
        message: "User created",
        user: resultUsersTable.rows[0],
        profile: resultProfilesTable.rows[0],
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUserById(req, res) {
    try {
      const userID = req.params.id;

      const { name, email, password, identity_type, identity_number, address } =
        req.body;

      // Loop the userObj and replace the value if req.body.obj !== undefined
      // for (const userProp in userObj) {
      //   if (req.body[userProp] !== undefined || req.body[userProp] !== "") {
      //     userObj[userProp] = req.body[userProp];
      //   } else {
      //     continue;
      //   }
      // }

      // Hash informations
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const hashedIdentityNumber = await bcrypt.hash(identity_number, salt);
      const hashedAddress = await bcrypt.hash(address, salt);

      const resultUsersTable = await pool.query(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
        [name, email, hashedPassword, userID]
      );

      const resultProfilesTable = await pool.query(
        "UPDATE profiles SET identity_type = $1, identity_number = $2, address = $3 WHERE user_id = $4 RETURNING *",
        [identity_type, hashedIdentityNumber, hashedAddress, userID]
      );

      res.status(200).json({
        message: "User updated",
        user: resultUsersTable.rows[0],
        profile: resultProfilesTable.rows[0],
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUserById(req, res) {
    try {
      const userID = req.params.id;

      // Delete from profiles table
      // await pool.query("DELETE FROM profiles WHERE user_id = $1", [userID]);

      // Delete from users table
      await pool.query("DELETE FROM users WHERE id = $1", [userID]);

      res.status(200).json({ message: `User deleted`, user_id: userID });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UsersController();
