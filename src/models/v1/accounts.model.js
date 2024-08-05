const prisma = require("../../../config/prisma");

class AccountsModel {
  async getAllAccounts() {
    return await prisma.accounts.findMany({
      select: {
        id: true,
        number: true,
        balance: true,
        bank_name: true,
        account_type: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getAccountById(account_id) {
    return await prisma.accounts.findUnique({
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
  }

  async getAccountByNumber(number) {
    return await prisma.accounts.findUnique({
      where: {
        number: number,
      },
    });
  }

  async createAccount(user_id, account_obj) {
    try {
      return await prisma.accounts.create({
        data: {
          ...account_obj,
          user_id: user_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AccountsModel();
