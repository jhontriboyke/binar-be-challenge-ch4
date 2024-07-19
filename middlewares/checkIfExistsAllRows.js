const pool = require("../db");

const checkIfExistsAllRows = (tableName, customMsg = tableName) => {
  return async (req, res, next) => {
    const results = await pool.query(`SELECT * FROM ${tableName}`);

    if (results.rows.length === 0) {
      return res.status(404).json({
        message: `There are no ${customMsg} data`,
        result: results.rows,
      });
    }

    next();
  };
};

module.exports = checkIfExistsAllRows;
