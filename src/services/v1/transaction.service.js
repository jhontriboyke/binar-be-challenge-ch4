const { NotFoundError, ValidationError } = require("../../errors/customErrors");

const { TransactionsModel, AccountsModel } =
  require("../../models/index").V1_MODELS;

class TransactionServices {
  /* GET all transactions */
  async getAllTransactions(queries) {
    return await TransactionsModel.getAllTransactions(queries);
  }

  async showTransaction(type, data) {
    const { transaction, to_account, to_user, from_account, from_user } = data;
    if (type === "deposit") {
      return {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        date: transaction.date,
        from_account: null,
        to_account: {
          ...to_account,
          user: {
            ...to_user,
          },
        },
      };
    }

    if (type === "withdraw") {
      return {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        date: transaction.date,
        from_account: {
          ...from_account,
          user: {
            ...from_user,
          },
        },
        to_account: null,
      };
    }

    return {
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      date: transaction.date,
      from_account: {
        ...from_account,
        user: {
          ...from_user,
        },
      },
      to_account: {
        ...to_account,
        user: {
          ...to_user,
        },
      },
    };
  }

  /* GET transaction by id */
  async getTransactionById(transaction_id) {
    const transaction = await TransactionsModel.getTransactionById(
      transaction_id
    );

    if (!transaction) {
      throw new NotFoundError("Transaction not found", {
        transaction_id: transaction_id,
      });
    }

    let from_account = null;
    let from_user = null;
    if (transaction.from_account_number !== null) {
      const { account, user } = await TransactionsModel.findAccountAndUserData(
        transaction.from_account_number
      );
      from_account = account;
      from_user = user;
    }

    let to_account = null;
    let to_user = null;
    if (transaction.to_account_number !== null) {
      const { account, user } = await TransactionsModel.findAccountAndUserData(
        transaction.to_account_number
      );
      to_account = account;
      to_user = user;
    }

    return this.showTransaction(transaction.type, {
      transaction,
      to_account,
      to_user,
      from_account,
      from_user,
    });
  }

  /* POST create a new transfer */
  async createTransfer(from_account_number, to_account_number, amount) {
    // Check from_account_number exist
    const from_account = await AccountsModel.getAccountByNumber(
      from_account_number
    );

    if (!from_account) {
      throw new NotFoundError("from_account_number did not exist", {
        from_account_number: from_account_number,
      });
    }

    // Check to_account_number exist
    const to_account = await AccountsModel.getAccountByNumber(
      to_account_number
    );

    if (!to_account) {
      throw new NotFoundError("to_account_number did not exist", {
        to_account_number: to_account_number,
      });
    }

    // Check from_account_balance with amount
    if (from_account.balance < amount) {
      throw new ValidationError(
        "Your balance is not enough for this transaction",
        { amount: amount }
      );
    }

    try {
      return await TransactionsModel.createTransfer(
        from_account_number,
        to_account_number,
        amount
      );
    } catch (error) {
      throw error;
    }
  }

  /* POST create a new deposit */
  async createDeposit(to_account_number, amount) {
    // Check to_account_number exist
    const to_account = await AccountsModel.getAccountByNumber(
      to_account_number
    );

    if (!to_account) {
      throw new NotFoundError("to_account_number did not exist", {
        to_account_number: to_account_number,
      });
    }

    try {
      return await TransactionsModel.createDeposit(to_account, amount);
    } catch (error) {
      throw error;
    }
  }

  /* POST create a new withdraw */
  async createWithdraw(from_account_number, amount) {
    // Check from_account_number exist
    const from_account = await AccountsModel.getAccountByNumber(
      from_account_number
    );

    if (!from_account) {
      throw new NotFoundError("from_account_number did not exist", {
        from_account_number: from_account_number,
      });
    }

    try {
      return await TransactionsModel.createWithdraw(from_account, amount);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TransactionServices();
