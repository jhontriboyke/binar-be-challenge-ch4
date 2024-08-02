const prisma = require("../../../config/prisma");

class AccountsModel {
  async getAllAccounts() {
    try {
      const results = await prisma.accounts.findMany({
        select: {
          id: true,
          number: true,
          balance: true,
          bank_name: true,
          account_type: true,
        },
      });

      return results;
    } catch (error) {
      return error;
    }
  }

  async getAccountById(account_id) {
    try {
      const result = await prisma.accounts.findUnique({
        where: {
          id: account_id,
        },
        select: {
          id: true,
          bank_name: true,
          number: true,
          pin_number: true,
          balance: true,
          account_type: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
            },
          },
        },
      });

      if (!result) {
        throw new Error("Account not found");
      }

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  async createAccount(
    user_id,
    account_type_id,
    bank_name,
    number,
    pin_number,
    balance
  ) {
    try {
      const result = await prisma.accounts.create({
        data: {
          user_id: user_id,
          bank_name: bank_name,
          number: number,
          pin_number: pin_number,
          balance: balance,
          account_type_id: account_type_id,
        },
      });
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateAccountById(account_id, number, pin_number, account_type_id) {
    try {
      const result = await prisma.accounts.update({
        where: {
          id: account_id,
        },
        data: {
          number: number,
          pin_number: pin_number,
          account_type_id: account_type_id,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteAccountById(account_id) {
    try {
      const account = await prisma.accounts.findUnique({
        where: {
          id: account_id,
        },
      });

      if (!account) {
        throw new Error("Account not found");
      }

      const result = await prisma.accounts.delete({
        where: {
          id: account_id,
        },
      });

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = new AccountsModel();
