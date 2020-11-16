const express = require("express");
const Router = express.Router();
const authController = require("../Controllers/authController");
const Validate = require("../Utils/validations");
const {
  createUserRules,
  loginUserRules,
  logoutUserRules,
  editUserRules,
  deleteUserRules,
  userAllPostRules,
} = require("../Utils/ValidationRules.js/AuthRules");

Router.post(
  "/createUser",
  createUserRules,
  Validate,
  authController.createUser
);

Router.post("/loginUser", loginUserRules, Validate, authController.loginUser);

Router.post(
  "/logoutUser",
  logoutUserRules,
  Validate,
  authController.logoutUser
);

Router.post("/editUser", editUserRules, Validate, authController.editUserInfo);

Router.post(
  "/deleteUser",
  deleteUserRules,
  Validate,
  authController.deleteUser
);

Router.post(
  "/userAllPost",
  userAllPostRules,
  Validate,
  authController.userAllPost
);

module.exports = Router;
