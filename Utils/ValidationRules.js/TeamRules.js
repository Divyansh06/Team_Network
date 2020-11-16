const { body } = require("express-validator");

module.exports.createTeamRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is Required!")
    .isString()
    .withMessage("invalid Name."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is Required!")
    .isString()
    .withMessage("invalid Description."),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is Required!")
    .isIn(["MALE", "FEMALE"])
    .withMessage(
      "Invalid Category. Category Should be one of 'MALE' or 'FEMALE'."
    ),
  body("creator")
    .trim()
    .notEmpty()
    .withMessage("craetor Id is Required!")
    .isMongoId()
    .withMessage("Invalid creator Id"),
];

module.exports.joinTeamRules = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("userId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
  body("teamId")
    .trim()
    .notEmpty()
    .withMessage("teamId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
];

module.exports.leaveTeamRules = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("userId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
  body("teamId")
    .trim()
    .notEmpty()
    .withMessage("teamId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
];

module.exports.deleteTeamRules = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("userId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
  body("teamId")
    .trim()
    .notEmpty()
    .withMessage("teamId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
];

module.exports.makeTeamAdminRules = [
  body("creator")
    .trim()
    .notEmpty()
    .withMessage("Cretor Id is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("userId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
  body("teamId")
    .trim()
    .notEmpty()
    .withMessage("teamId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
];

module.exports.removeTeamAdminRules = [
  body("creator")
    .trim()
    .notEmpty()
    .withMessage("creator Id is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("userId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
  body("teamId")
    .trim()
    .notEmpty()
    .withMessage("teamId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
];

module.exports.getWallPostRules = [
  body("teamId")
    .trim()
    .notEmpty()
    .withMessage("teamId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
];

module.exports.getTeamMembersRules = [
  body("teamId")
    .trim()
    .notEmpty()
    .withMessage("teamId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
];
