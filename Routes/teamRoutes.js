const express = require("express");
const Router = express.Router();
const teamController = require("../Controllers/teamController");
const Validate = require("../Utils/validations");
const {
  createTeamRules,
  deleteTeamRules,
  joinTeamRules,
  leaveTeamRules,
  makeTeamAdminRules,
  removeTeamAdminRules,
  getWallPostRules,
  getTeamMembersRules,
} = require("../Utils/ValidationRules.js/TeamRules");

Router.get("/teams", teamController.getTeams);

Router.get("/team/:teamId", teamController.getTeam);

Router.post(
  "/createTeam",
  createTeamRules,
  Validate,
  teamController.createTeam
);

Router.post(
  "/deleteTeam",
  deleteTeamRules,
  Validate,
  teamController.deleteTeam
);

Router.post("/joinTeam", joinTeamRules, Validate, teamController.joinTeam);

Router.post("/leaveTeam", leaveTeamRules, Validate, teamController.leaveTeam);

Router.post(
  "/makeAdmin",
  makeTeamAdminRules,
  Validate,
  teamController.makeTeamAdmin
);

Router.post(
  "/removeAdmin",
  removeTeamAdminRules,
  Validate,
  teamController.removeTeamAdmin
);

Router.post("/wallPosts", getWallPostRules, Validate, teamController.wallPosts);

Router.post(
  "/teamMembers",
  getTeamMembersRules,
  Validate,
  teamController.teamMembers
);

module.exports = Router;
