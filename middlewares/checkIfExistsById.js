const pool = require("../db");

const checkIfExistById = (tableName) => {
  return async (req, res, next) => {
    const id = req.params.id;

    try {
      const result = await pool.query(
        `SELECT * FROM ${tableName} WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: `${tableName.slice(0, -1)} not found`,
          [`${tableName.slice(0, -1)}`]: {
            id: id,
          },
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = checkIfExistById;
