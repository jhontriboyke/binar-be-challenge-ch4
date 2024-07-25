const { check, validationResult } = require("express-validator");

const validateUser = [
  check("first_name").notEmpty().withMessage("First Name is required"),
  check("last_name").notEmpty().withMessage("Last Name is required"),
  check("email").isEmail().withMessage("Provide a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters"),
  check("identity_type")
    .isIn(["KTP", "KK", "Passport"])
    .withMessage("Please provide valid identity type (KTP, KK, or Passport)"),
  check("identity_number")
    .isLength({ min: 16 })
    .withMessage("Provide a valid identity number (16 digits)"),
  check("phone_number")
    .isLength({ min: 10, max: 16 })
    .withMessage("Provide a valid phone number (ex +62)"),
  check("nationality")
    .notEmpty()
    .withMessage("Please provide a valid nationality"),
  check("job").notEmpty().withMessage("Please provide a valid job"),
  check("street").notEmpty().withMessage("Street name is required"),
  check("postal_code").notEmpty().withMessage("Postal code number is required"),
  check("city").notEmpty().withMessage("City name is required"),
  check("province").notEmpty().withMessage("Province name is required"),
  check("country").notEmpty().withMessage("Country name is required"),
  (req, res, next) => {
    const results = validationResult(req);

    if (results.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: results.array() });
  },
];

const validateAccount = [
  check("user_id").isUUID().withMessage("Please provide a valid user_id"),
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

    res.status(400).json({ errors: results.array() });
  },
];

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

    res.status(400).json({ errors: results.array() });
  },
];

module.exports = {
  validateUser,
  validateAccount,
  validateUpdateAccount,
};
