const { TransactionsModel, UserModel } = require("../../models/v1");

class TransactionsController {
  async getAllTranscactions(req, res) {
    try {
      const queries = {};

      if (req.query.type) {
        queries.type = req.query.type;
      }

      const transactions = await TransactionsModel.getAllTransactions(queries);

      if (transactions.length === 0) {
        return res.success(
          200,
          { transactions: null },
          "Transactions are empty"
        );
      }

      res.success(
        200,
        { transactions: transactions },
        "Data retrieved successfully"
      );
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async getTransactionById(req, res) {
    try {
      const transaction_id = req.params.id;

      const transaction = await TransactionsModel.getTransactionById(
        transaction_id
      );

      console.log(transaction);

      if (transaction.error) {
        return res.fail(
          404,
          { transaction_id: transaction_id },
          "Transaction not found"
        );
      }

      res.success(200, { transaction: transaction }, "Transaction found");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async createWithdrawTransaction(req, res) {
    try {
      const { from_account_number, amount } = req.body;

      const transaction = await TransactionsModel.createWithdraw(
        from_account_number,
        amount
      );

      if (transaction.error) {
        return res.fail(
          404,
          { error: transaction.error },
          transaction.error.message
        );
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

  async createDepositTransaction(req, res) {
    try {
      const { to_account_number, amount } = req.body;

      const transaction = await TransactionsModel.createDeposit(
        to_account_number,
        amount
      );

      if (transaction.error) {
        return res.fail(
          404,
          { error: transaction.error },
          transaction.error.message
        );
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

  async createTransferTransaction(req, res) {
    try {
      const { from_account_number, to_account_number, amount } = req.body;

      const transaction = await TransactionsModel.createTransfer(
        from_account_number,
        to_account_number,
        amount
      );

      if (transaction.error) {
        return res.fail(
          404,
          { error: transaction.error },
          transaction.error.message
        );
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
