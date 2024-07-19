const { check, validationResult } = require("express-validator");

const validateUser = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Provide a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters"),
  check("identity_type")
    .notEmpty()
    .withMessage("Provide a valid identity types (KTP or Pasport)"),
  check("identity_number")
    .isLength({ min: 16 })
    .withMessage("Provide a valid identity number (16 digits)"),
  check("address").notEmpty().withMessage("Address is required"),
  (req, res, next) => {
    const results = validationResult(req);

    if (results.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: results.array() });
  },
];

module.exports = validateUser;
