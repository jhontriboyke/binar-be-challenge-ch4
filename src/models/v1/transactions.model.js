const prisma = require("../../../config/prisma");

class TransactionsModel {
  async getAllTransactions() {
    try {
      const results = await prisma.transactions.findMany();

      return results;
    } catch (error) {
      return errror;
    }
  }

  async getTransactionById(transaction_id) {
    try {
      const result = await prisma.transactions.findUnique({
        where: {
          id: transaction_id,
        },
      });

      if (!result) {
        throw new Error("Transaction not found");
      }

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
        const transaction = await prisma.transactions.create({
          data: {
            amount,
            from_account_id: from_account.id,
            to_account_id: to_account.id,
            transaction_type_id: 3,
          },
        });

        return transaction;
      });

      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new TransactionsModel();
