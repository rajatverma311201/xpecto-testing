const express = require("express");
const eventTeamController = require("./../controllers/eventTeamController");
const authController = require("../controllers/authController");
const router = express.Router();

// sub route of /api/eventTeam

router.get("/all", eventTeamController.getAll);
router.get("/one/:id", eventTeamController.getTeamsByTeamId);
router.get(
  "/allTeams/createrId/:id",
  eventTeamController.getAllRegisteredTeamsByCreaterId
);
router.get(
  "/allTeams/userId/:id",
  eventTeamController.getAllRegisteredTeamsByUserIdExcludingOwnCreatedTeam
);
router.get(
  "/allTeams/gameId/:id",
  eventTeamController.getAllRegisteredTeamsByGameId
);

router.use(authController.protect);
// temporaray controller to get current user
//testing
// router.use(eventTeamController.attachCurrentUser);

router.post("/create", eventTeamController.create);
router.post("/add-player", eventTeamController.addPlayer);
router.post("/add-game", eventTeamController.addGame);
router.post("/code", eventTeamController.getCode);

router.get(
  "/teamForCurrentEvent/:eventId",
  eventTeamController.teamForCurrentEvent
);
router.delete("/deleteTeam/:teamId", eventTeamController.deleteTeam);

//testing
// router.post("/deleteTeam/:teamId", eventTeamController.deleteTeam);

module.exports = router;
