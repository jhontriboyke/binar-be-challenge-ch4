const prisma = require("../../../config/prisma");

class TransactionsModel {
  async getAllTransactions(queries) {
    return await prisma.transaction.findMany({
      where: { type: queries.type },
      orderBy: queries.orderBy,
    });
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
      throw error;
    }
  }

  async getTransactionById(transaction_id) {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: {
          id: transaction_id,
        },
      });

      if (!transaction) {
        return null;
      }

      return transaction;
    } catch (error) {
      throw error;
    }
  }

  async createDeposit(to_account, amount) {
    try {
      return await prisma.$transaction(async (prisma) => {
        await prisma.accounts.update({
          where: {
            number: to_account.number,
          },
          data: {
            balance: to_account.balance + amount,
          },
        });

        const transaction = await prisma.transaction.create({
          data: {
            from_account_number: null,
            to_account_number: to_account.number,
            amount: amount,
            type: "deposit",
          },
        });

        return transaction;
      });
    } catch (error) {
      throw error;
    }
  }

  async createWithdraw(from_account, amount) {
    try {
      return await prisma.$transaction(async (prisma) => {
        await prisma.accounts.update({
          where: {
            number: from_account.number,
          },
          data: {
            balance: from_account.balance - amount,
          },
        });

        const transaction = await prisma.transaction.create({
          data: {
            from_account_number: from_account.number,
            to_account_number: null,
            amount: amount,
            type: "withdraw",
          },
        });

        return transaction;
      });
    } catch (error) {
      throw error;
    }
  }

  async createTransfer(from_account_number, to_account_number, amount) {
    try {
      const from_account = await prisma.accounts.findUnique({
        where: {
          number: from_account_number,
        },
      });

      const to_account = await prisma.accounts.findUnique({
        where: {
          number: to_account_number,
        },
      });

      return await prisma.$transaction(async (prisma) => {
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
        return await prisma.transaction.create({
          data: {
            amount,
            from_account_number: from_account_updated.number,
            to_account_number: to_account_updated.number,
            type: "transfer",
          },
        });
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TransactionsModel();
