const { check, validationResult } = require("express-validator");
const { ValidationError } = require("../../errors/customErrors");

const validateUser = [
  check("first_name").notEmpty().withMessage("First name is required"),
  check("last_name").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Provide a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters"),
  check("date_of_birth")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Date of birth must be in YYYY-MM-DD"),
  check("gender")
    .isIn(["male", "female"])
    .withMessage("Please choose between male and female"),
  check("identity_type")
    .isIn(["KTP", "KK", "Passport"])
    .withMessage("Please provide valid identity type (KTP, KK, or Passport)"),
  check("identity_number")
    .notEmpty()
    .withMessage("Provide a valid identity number"),
  check("phone_number")
    .isLength({ min: 10, max: 16 })
    .withMessage("Provide a valid phone number (ex +62)"),
  check("occupation")
    .notEmpty()
    .withMessage("Please provide a valid occupation / job"),
  check("nationality")
    .notEmpty()
    .withMessage("Please provide a valid nationality"),
  check("street").notEmpty().withMessage("Street name is required"),
  check("zip_code").notEmpty().withMessage("Zip code number is required"),
  check("city").notEmpty().withMessage("City name is required"),
  check("province").notEmpty().withMessage("Province name is required"),
  check("country").notEmpty().withMessage("Country name is required"),
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

module.exports = validateUser;
