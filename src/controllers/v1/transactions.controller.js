const { TransactionsModel } = require("../../models/v1");

class TransactionsController {
  async getAllTranscactions(req, res) {
    try {
      const transactions = await TransactionsModel.getAllTransactions();

      res.success(
        200,
        { transactions: transactions },
        "Data retrieved successfully"
      );
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async createTransaction(req, res) {
    try {
      const { from_account_number, to_account_number, amount } = req.body;
      const transaction = await TransactionsModel.createTransfer(
        from_account_number,
        to_account_number,
        amount
      );

      if (transaction.error) {
        res.fail(404, { error: transaction.error }, transaction.error.message);
      }

      res.success(
        200,
        { transaction: transaction },
        "Transaction success and created"
      );
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }
}

module.exports = new TransactionsController();
