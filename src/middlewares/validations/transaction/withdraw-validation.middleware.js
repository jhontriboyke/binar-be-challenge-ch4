const { check, validationResult } = require("express-validator");
const { ValidationError } = require("../../../errors/customErrors");

const validateWithdrawTransaction = [
  check("from_account_number")
    .isLength({ min: 12, max: 12 })
    .withMessage("Bank Account Number should be exactly 12 digits"),
  check("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount should be more than 0"),
  (req, res, next) => {
    const results = validationResult(req);

    if (results.isEmpty()) {
      return next();
    }

    const errorsArr = results.array().map((result) => {
      return { property: result.path, message: result.msg };
    });

    throw new ValidationError("Validation error", errorsArr);
  },
];

module.exports = validateWithdrawTransaction;
