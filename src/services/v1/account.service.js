const bcrypt = require("bcrypt");
const { AccountsModel, UserModel } = require("../../models").V1_MODELS;
const {
  NotFoundError,
  DuplicationError,
  UnauthorizedError,
} = require("../../errors/customErrors");

class AccountServices {
  async getAllAccounts(user_id) {
    const user = await UserModel.getUserById(user_id);

    if (user.role === "User") {
      return await AccountsModel.getAccountByUserId(user_id);
    }

    return await AccountsModel.getAllAccounts();
  }

  async getAccountById(account_id) {
    const account = await AccountsModel.getAccountById(account_id);

    if (!account) {
      throw new NotFoundError("Account not found", { account_id: account_id });
    }

    return account;
  }

  async getAccountByUserId(user_id) {
    const account = await AccountsModel.getAccountByUserId(user_id);

    if (account.length == 0) {
      throw new NotFoundError(
        "You cannot access, because you dont have any accounts",
        null
      );
    }

    return account;
  }

  async getAccountByIdWithRole(account_id_from_param, user_id_from_token) {
    // Check if account_id_from_param exist
    const account_from_param = await this.getAccountById(account_id_from_param);

    if (!account_from_param) {
      throw new NotFoundError("Account not found", null);
    }
    // Check user_id_from_token exist and its role
    const user = await UserModel.getUserById(user_id_from_token);

    if (user.role === "User") {
      // Check if user has account(s)
      const user_account = await this.getAccountByUserId(user.id);

      // Check if user_account.id match with account_id from param
      if (user_account.length > 1) {
        const account_from_param = user_account.find(
          (account) => account.id == account_id_from_param
        );

        if (!account_from_param) {
          throw new UnauthorizedError("You can not access this resource", null);
        }

        if (account_from_param.user_id !== user.id) {
          throw new UnauthorizedError("You cannot access this resource!", null);
        }

        return account_from_param;
      } else {
        const account_from_param = await this.getAccountById(
          account_id_from_param
        );

        if (!account_id_from_param) {
          throw new NotFoundError("Account not found", null);
        }

        if (user_account[0].id !== account_from_param.id) {
          throw new UnauthorizedError(
            "You cannot access this resource!!",
            null
          );
        }

        return account_from_param;
      }
    }

    if (user.role === "Admin") {
      // Check id from both user same
      const account = await this.getAccountById(account_id_from_param);

      const { pin_number, ...restAccountProps } = account;

      return restAccountProps;
    }
  }

  async createAccount(user_id, account_obj) {
    // Check if user exist
    const existingUser = await UserModel.getUserById(user_id);

    if (!existingUser) {
      throw new NotFoundError("User not found", { user_id: user_id });
    }

    const isUserProfileComplete = Object.values(existingUser.profile).every(
      (value) => value !== null
    );
    const isUserAddressComplete = existingUser.addresses.every((address) =>
      Object.values(address).every((value) => value !== null)
    );

    if (!isUserProfileComplete && !isUserAddressComplete) {
      throw new UnauthorizedError(
        "Please complete your profile and address data first to access this resource",
        null
      );
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
