const prisma = require("../../../config/prisma");

class AccountsModel {
  static async findAccountById(account_id) {
    try {
      const result = await prisma.accounts.findUnique({
        where: {
          id: account_id,
        },
      });

      if (result) {
        return result;
      } else {
        throw new Error("Account not found");
      }
    } catch (error) {
      return error;
    }
  }

  async getAllAccounts() {
    try {
      const results = await prisma.accounts.findMany();

      return results;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getAccountById(account_id) {
    try {
      const result = await prisma.accounts.findUnique({
        where: {
          id: account_id,
        },
      });

      if (!result) {
        throw new Error("Account not found");
      }

      return result;
    } catch (error) {
      return error;
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
      return { error: error.message };
    }
  }

  async deleteAccountById(account_id) {
    try {
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
