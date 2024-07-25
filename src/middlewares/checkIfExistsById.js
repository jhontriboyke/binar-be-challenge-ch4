// NOT USE AGAIN

const pool = require("../../config/db");

const checkIfExistById = (tableName) => {
  return async (req, res, next) => {
    const id = req.params.id;

    try {
      const result = await pool.query(
        `SELECT 1 FROM ${tableName} WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      res.fail(404, { [`${tableName.slice(0, -1)}`]: { id } }, error.message);
    }
  };
};

module.exports = checkIfExistById;
