const { AccountServices } = require("../../services/").V1_SERVICES;

class AccountController {
  async getAllAccounts(req, res) {
    try {
      const accounts = await AccountServices.getAllAccounts();

      if (accounts.length === 0) {
        return res.success(200, "Accounts data are empty", {
          accounts: accounts,
        });
      }

      res.success(200, "Data retrieved succesfully", { accounts: accounts });
    } catch (error) {
      next(error);
    }
  }

  async getAccountById(req, res, next) {
    try {
      const account_id = req.params.id;
      const account = await AccountServices.getAccountById(account_id);

      res.success(200, "Account found", { account: account });
    } catch (error) {
      next(error);
    }
  }

  async createAccount(req, res, next) {
    try {
      const {
        user_id,
        account_type_id,
        bank_name,
        number,
        pin_number,
        balance,
      } = req.body;

      const account_obj = {
        account_type_id,
        bank_name,
        number,
        pin_number,
        balance,
      };

      const account = await AccountServices.createAccount(user_id, account_obj);

      res.success(201, "Account created", { account: account });
    } catch (error) {
      next(error);
    }
  }

  async updateAccountById(req, res, next) {
    try {
      const account_id = req.params.id;
      const { account_type_id, pin_number } = req.body;

      const updated_account = await AccountServices.updateAccountById(
        account_id,
        { account_type_id, pin_number }
      );

      res.success(201, "Account updated", { account: updated_account });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccountController();
