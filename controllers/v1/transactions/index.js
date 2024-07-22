const pool = require("../../../config/db");
const { v4: uuidv4 } = require("uuid");

class TransactionsController {
  async getAllTransactions(req, res) {
    try {
      const results = await pool.query("SELECT * FROM transactions;");
      res.status(200).json(results.rows[0]);
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  }

  async getTransactionById(req, res) {
    try {
      const transcationID = req.params.id;

      const results = await pool.query(
        "SELECT * FROM transactions WHERE id = $1",
        [transcationID]
      );

      if (results.rows.length === 0) {
        throw new Error("Transaction not found");
      }

      res
        .status(200)
        .json({ message: "Transaction found", transaction: results.rows[0] });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new TransactionsController();
