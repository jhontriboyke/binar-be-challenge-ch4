const { check, validationResult } = require("express-validator");
const { ValidationError } = require("../../errors/customErrors");

const validateNewUser = [
  check("first_name").notEmpty().withMessage("First name is required"),
  check("last_name").optional(),
  check("email").isEmail().withMessage("Provide a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters"),
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

module.exports = validateNewUser;
