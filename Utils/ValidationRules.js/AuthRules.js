const { body } = require("express-validator");

module.exports.createUserRules = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("Name is Required!")
    .isString()
    .withMessage("invalid Name."),
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Email is Required!")
    .isEmail()
    .withMessage("Please enter a correct email address."),
  body("password")
    .notEmpty()
    .trim()
    .withMessage("Password is Required!")
    .isAlphanumeric()
    .withMessage("Password should be AlphaNumeric!")
    .isLength({ min: 8 })
    .withMessage("Password should be alteast 8 digits long!"),
];

module.exports.loginUserRules = [
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Email is Required!")
    .isEmail()
    .withMessage("Please enter a correct email address."),
  body("password")
    .notEmpty()
    .trim()
    .withMessage("Password is Required!")
    .isAlphanumeric()
    .withMessage("Password should be AlphaNumeric!")
    .isLength({ min: 8 })
    .withMessage("Password should be alteast 8 digits long!"),
];

module.exports.logoutUserRules = [];

module.exports.editUserRules = [];

module.exports.deleteUserRules = [
  body("userId")
    .notEmpty()
    .trim()
    .withMessage("userId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
];

module.exports.userAllPostRules = [
  body("userId")
    .notEmpty()
    .trim()
    .withMessage("userId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
];
