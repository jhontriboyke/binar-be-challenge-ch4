const pool = require("../db/index");

class AccountsController {
  async getAllAccounts(req, res) {
    try {
      const results = await pool.query("SELECT * FROM bank_accounts;");
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getAccountById(req, res) {
    try {
      const accountID = req.params.id;

      const result = await pool.query(
        "SELECT * FROM bank_accounts WHERE id = $1",
        [accountID]
      );

      if (result.rows.length === 0) {
        throw new Error("Account not found");
      }

      res
        .status(200)
        .json({ message: "Account found", account: result.rows[0] });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateAccountById(req, res) {
    try {
      const accountID = req.params.id;

      const result = await pool.query(
        "SELECT * FROM bank_accounts WHERE id = $1",
        [accountID]
      );

      if (result.rows.length === 0) {
        throw new Error("Account not found");
      }

      const accountObj = result.rows[0];
      console.log(accountObj);
      console.log(req.body);

      for (const accountProp in accountObj) {
        for (const bodyProp in req.body) {
          if (bodyProp === accountProp) {
            accountObj[accountProp] = req.body[bodyProp];
          } else {
            continue;
          }
        }
      }

      //   for (const property in accountObj) {
      //     if (accountObj[property] == req.body[property]) {
      //       accountObj[property] = req.body[property];
      //     } else {
      //       continue;
      //     }
      //   }

      const newResult = await pool.query(
        "UPDATE bank_accounts SET user_id = $1, bank_name = $2, bank_account_number = $3 WHERE id = $4 RETURNING *",
        [
          accountObj.user_id,
          accountObj.bank_name,
          accountObj.bank_account_number,
          accountID,
        ]
      );

      console.log(newResult.rows);

      res
        .status(200)
        .json({ message: "Account updated", account: newResult.rows[0] });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new AccountsController();
