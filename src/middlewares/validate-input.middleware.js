const { check, validationResult } = require("express-validator");

const validateUpdateAccount = [
  check("account_type_id")
    .isIn([1, 2, 3])
    .withMessage(
      "Please choose a number for your Account Type (1: Basic, 2: Premium, 3: Deluxe)"
    ),
  check("number")
    .isLength({ min: 12, max: 12 })
    .withMessage("Bank Account Number should be exact 12 digits"),
  check("pin_number")
    .isLength({ min: 6, max: 6 })
    .withMessage("Pin Number should be exact 6 digits"),
  (req, res, next) => {
    const results = validationResult(req);

    if (results.isEmpty()) {
      return next();
    }

    const errorsArr = results.array().map((result) => {
      return { property: result.path, message: result.msg };
    });

    res.fail(403, errorsArr, "Error validation");
  },
];

module.exports = {
  validateUserProfileAndAddress,
  validateAccount,
  validateUpdateAccount,
  validateTransferTransaction,
  validateDepositTransaction,
  validateWithdrawTransaction,
};
