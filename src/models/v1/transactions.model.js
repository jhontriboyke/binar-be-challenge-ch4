const prisma = require("../../../config/prisma");

class TransactionsModel {
  async getAllTransactions(queries) {
    try {
      const results = await prisma.transaction.findMany({
        where: queries,
      });

      return results;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAccountAndUserData(account_number) {
    try {
      let account = await prisma.accounts.findUnique({
        where: {
          number: account_number,
        },
        select: {
          id: true,
          number: true,
          user_id: true,
        },
      });

      let user = await prisma.user.findUnique({
        where: {
          id: account.user_id,
        },
        select: {
          first_name: true,
          last_name: true,
        },
      });

      delete account.user_id;

      return {
        account,
        user,
      };
    } catch (error) {
      return error;
    }
  }

  async getTransactionById(transaction_id) {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: {
          id: transaction_id,
        },
      });

      const { account: from_account, user: from_user } =
        await this.findAccountAndUserData(transaction.from_account_number);

      const { account: to_account, user: to_user } =
        await this.findAccountAndUserData(transaction.to_account_number);

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
    } catch (error) {
      return { error: error.message };
    }
  }

  async createDeposit(to_account_number, amount) {
    try {
      const to_account = await prisma.accounts.findUnique({
        where: {
          number: to_account_number,
        },
      });

      if (!to_account) {
        throw new Error("Account not found");
      }

      const result = await prisma.$transaction(async (prisma) => {
        await prisma.accounts.update({
          where: {
            number: to_account_number,
          },
          data: {
            balance: to_account.balance + amount,
          },
        });

        const transaction = await prisma.transaction.create({
          data: {
            from_account_number: null,
            to_account_number: to_account_number,
            amount: amount,
            type: "deposit",
          },
        });

        return transaction;
      });

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  async createWithdraw(from_account_number, amount) {
    try {
      const from_account = await prisma.accounts.findUnique({
        where: {
          number: from_account_number,
        },
      });

      if (!from_account) {
        throw new Error("Account not found");
      }

      const result = await prisma.$transaction(async (prisma) => {
        await prisma.accounts.update({
          where: {
            number: from_account_number,
          },
          data: {
            balance: from_account.balance - amount,
          },
        });

        const transaction = await prisma.transaction.create({
          data: {
            from_account_number: from_account_number,
            to_account_number: null,
            amount: amount,
            type: "withdraw",
          },
        });

        return transaction;
      });

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  async createTransfer(from_account_number, to_account_number, amount) {
    try {
      // Check from_account_number exist
      const from_account = await prisma.accounts.findUnique({
        where: {
          number: from_account_number,
        },
      });

      if (!from_account) {
        throw new Error("From account not found");
      }

      // Check to_account_number exist
      const to_account = await prisma.accounts.findUnique({
        where: {
          number: to_account_number,
        },
      });

      if (!to_account) {
        throw new Error("To account not found");
      }

      // Check from_account balance more than amount
      if (from_account.balance < amount) {
        throw new Error("Your balance is insufficient");
      }

      const result = await prisma.$transaction(async () => {
        // Update from_account balance data (decrease)
        const from_account_updated = await prisma.accounts.update({
          where: {
            id: from_account.id,
          },
          data: {
            balance: from_account.balance - amount,
          },
        });

        // Update to_account balance data (increase)
        const to_account_updated = await prisma.accounts.update({
          where: {
            id: to_account.id,
          },
          data: {
            balance: to_account.balance + amount,
          },
        });

        // Add to transactions table
        const transaction = await prisma.transaction.create({
          data: {
            amount,
            from_account_number: from_account_updated.number,
            to_account_number: to_account_updated.number,
            type: "transfer",
          },
        });

        return transaction;
      });

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = new TransactionsModel();
