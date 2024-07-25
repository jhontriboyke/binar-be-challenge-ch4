const { UserModel } = require("../../models/v1");
const AccountsModel = require("../../models/v1/accounts.model");

class AccountController {
  async getAllAccounts(req, res) {
    try {
      const accounts = await AccountsModel.getAllAccounts();

      if (accounts.length === 0) {
        return res.success(
          200,
          { accounts: accounts },
          "Accounts data are empty"
        );
      }

      res.success(200, { accounts: accounts }, "Data retrieved succesfully");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async getAccountById(req, res) {
    try {
      const account_id = req.params.id;
      const account = await AccountsModel.getAccountById(account_id);

      if (account instanceof Error) {
        return res.fail(404, {}, account.message);
      }

      res.success(200, { account: account }, "Account found");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async createUser(req, res) {
    try {
      const {
        user_id,
        account_type_id,
        bank_name,
        number,
        pin_number,
        balance,
      } = req.body;

      const account = await AccountsModel.createAccount(
        user_id,
        +account_type_id,
        bank_name,
        number,
        pin_number,
        +balance
      );

      res.success(200, { account: account }, "Account created");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }

  async updateAccountById(req, res) {
    try {
      const account_id = req.params.id;
      const { number, pin_number, account_type_id } = req.body;

      const account = await AccountsModel.updateAccountById(
        account_id,
        number,
        pin_number,
        account_type_id
      );

      res.success(200, { account: account }, "Account updated");
    } catch (error) {
      res.error(500, error.message, "Server Internal Error");
    }
  }
}

module.exports = new AccountController();
