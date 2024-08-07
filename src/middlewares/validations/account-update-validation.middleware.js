const { check, validationResult } = require("express-validator");
const { ValidationError } = require("../../errors/customErrors");

const validateUpdateAccount = [
  check("account_type_id")
    .isIn([1, 2, 3])
    .withMessage(
      "Please choose a number for your Account Type (1: Basic, 2: Premium, 3: Deluxe)"
    ),
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

    throw new ValidationError("Validation error", errorsArr);
  },
];

module.exports = validateUpdateAccount;
