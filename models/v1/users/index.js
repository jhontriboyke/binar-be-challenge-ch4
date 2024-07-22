const pool = require("../../../config/db");

class UserModel {
  async getAllUser() {
    const query = `
            SELECT
                id,
                name,
                email
            FROM
                users;
        `;
    const results = await pool.query(query);
    return results.rows;
  }

  async getUserById(userId) {
    const query = `
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
      `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  async createUser(uuid, name, email, hashedPassword) {
    const query = `
      INSERT INTO 
        users (id, name, email, password) 
      VALUES
        ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const values = [uuid, name, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async createProfile(
    uuid,
    user_id,
    identity_type,
    hashedIdentityNumber,
    hashedAddress
  ) {
    const query = `
      INSERT INTO
        profiles (id, user_id, identity_type, identity_number, address)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      uuid,
      user_id,
      identity_type,
      hashedIdentityNumber,
      hashedAddress,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateUserById(userId, name, email, hashedPassword) {
    const query = `
      UPDATE
        users
      SET
        name = $1, email = $2, password = $3
      WHERE id = $4
      RETURNING
        *;
      `;
    const values = [name, email, hashedPassword, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateProfileById(
    userId,
    identity_type,
    hashedIdentityNumber,
    hashedAddress
  ) {
    const query = `
      UPDATE
        profiles
      SET identity_type = $1, identity_number = $2, address = $3
      WHERE user_id = $4
      RETURNING
      *;
    `;
    const values = [identity_type, hashedIdentityNumber, hashedAddress, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteUserById(userId) {
    const value = [userId];
    const query = (tableName) => {
      return `DELETE FROM ${tableName} WHERE user_id = $1`;
    };

    const profile = await pool.query(query("profiles"), value);
    const user = await pool.query(query("users"), value);

    return { profile, user };
  }
}

module.exports = new UserModel();
