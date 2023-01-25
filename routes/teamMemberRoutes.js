const express = require("express");
const router = express.Router();

const teamMemberController = require("./../controllers/teamMemberController");

router
  .route("/")
  .get(teamMemberController.getAllTeamMembers)
  .post(teamMemberController.createTeamMember)
  .delete(teamMemberController.deleteAllTeamMembers);

router
  .route("/:id")
  .get(teamMemberController.getTeamMember)
  .patch(teamMemberController.updateTeamMember)
  .delete(teamMemberController.deleteTeamMember);

module.exports = router;
