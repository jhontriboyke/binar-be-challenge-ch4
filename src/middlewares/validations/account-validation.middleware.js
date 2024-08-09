const { check, validationResult } = require("express-validator");
const { ValidationError } = require("../../errors/customErrors");

const validateAccount = [
  check("account_type_id")
    .isIn([1, 2, 3])
    .withMessage(
      "Please choose a number for your Account Type (1: Basic, 2: Premium, 3: Deluxe)"
    ),
  check("bank_name").notEmpty().withMessage("Bank Name is required"),
  check("number")
    .isLength({ min: 12, max: 12 })
    .withMessage("Bank Account Number should be exact 12 digits"),
  check("pin_number")
    .isLength({ min: 6, max: 6 })
    .withMessage("Pin Number should be exact 6 digits"),
  check("balance").isFloat({ gt: 0 }).withMessage("Balance should more than 0"),
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

module.exports = validateAccount;
