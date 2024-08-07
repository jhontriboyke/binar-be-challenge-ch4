const bcrypt = require("bcrypt");
const { AccountsModel, UserModel } = require("../../models").V1_MODELS;
const {
  NotFoundError,
  DuplicationError,
} = require("../../errors/customErrors");

class AccountServices {
  async getAllAccounts() {
    return await AccountsModel.getAllAccounts();
  }

  async getAccountById(account_id) {
    const account = await AccountsModel.getAccountById(account_id);

    if (!account) {
      throw new NotFoundError("Account not found", { account_id: account_id });
    }

    return account;
  }

  async createAccount(user_id, account_obj) {
    // Check if user exist
    const existingUser = await UserModel.getUserById(user_id);

    if (!existingUser) {
      throw new NotFoundError("User not found", { user_id: user_id });
    }
    const { number, pin_number } = account_obj;

    // Check if account.number already used
    const isNumberExist = await AccountsModel.getAccountByNumber(number);

    if (isNumberExist) {
      throw new DuplicationError("Number account already used", {
        number: number,
      });
    }

    let new_account;
    try {
      // Hash the PIN number
      const hashed_pin_number = await bcrypt.hash(pin_number, 10);

      new_account = await AccountsModel.createAccount(user_id, {
        ...account_obj,
        pin_number: hashed_pin_number,
      });

      return new_account;
    } catch (error) {
      throw error;
    }
  }

  async updateAccountById(account_id, account_obj) {
    // Check if account exist by id
    const isAccountExist = await this.getAccountById(account_id);

    if (!isAccountExist) {
      throw error;
    }

    try {
      return await AccountsModel.updateAccountById(account_id, account_obj);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AccountServices();
