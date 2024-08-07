const { UnauthorizedError } = require("../../errors/customErrors");
const { AccountsModel } = require("../../models/v1");

const { TransactionServices } = require("../../services/index").V1_SERVICES;

class TransactionsController {
  async getAllTranscactions(req, res, next) {
    try {
      const queries = {};
      const user_id = req.user.id;

      if (req.query.type) {
        queries.type = req.query.type;
      }

      if (req.query.amount) {
        queries.orderBy = {
          amount: req.query.amount,
        };
      }

      if (req.query.date) {
        queries.orderBy = {
          date: req.query.date,
        };
      }

      const transactions = await TransactionServices.getAllTransactions(
        queries,
        user_id
      );

      if (transactions.length === 0) {
        return res.success(200, "Transactions are empty", {
          transactions: transactions,
        });
      }

      res.success(200, "Data retrieved successfully", {
        transactions: transactions,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTransactionById(req, res, next) {
    try {
      const transaction_id = req.params.id;

      const transaction = await TransactionServices.getTransactionById(
        transaction_id
      );

      res.success(200, "Transaction found", { transaction: transaction });
    } catch (error) {
      next(error);
    }
  }

  async createTransferTransaction(req, res, next) {
    try {
      const { from_account_number, to_account_number, amount } = req.body;

      const accounts_numbers = (
        await AccountsModel.getAccountByUserId(req.user.id)
      ).map((account) => account.number);

      if (!accounts_numbers.includes(from_account_number)) {
        throw new UnauthorizedError("You can not access this resource");
      }

      const transaction = await TransactionServices.createTransfer(
        from_account_number,
        to_account_number,
        amount
      );

      res.success(201, "Transfer success and created", {
        transaction: transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  async createDepositTransaction(req, res, next) {
    try {
      const { to_account_number, amount } = req.body;
      const accounts_numbers = (
        await AccountsModel.getAccountByUserId(req.user.id)
      ).map((account) => account.number);

      if (!accounts_numbers.includes(to_account_number)) {
        throw new UnauthorizedError("You can not access this resource");
      }

      const transaction = await TransactionServices.createDeposit(
        to_account_number,
        amount
      );

      res.success(201, "Deposit success and created", {
        transaction: transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  async createWithdrawTransaction(req, res, next) {
    try {
      const { from_account_number, amount } = req.body;

      const accounts_numbers = (
        await AccountsModel.getAccountByUserId(req.user.id)
      ).map((account) => account.number);

      if (!accounts_numbers.includes(from_account_number)) {
        throw new UnauthorizedError("You can not access this resource");
      }

      const transaction = await TransactionServices.createWithdraw(
        from_account_number,
        amount
      );

      res.success(201, "Withdraw success and created", {
        transaction: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransactionsController();
