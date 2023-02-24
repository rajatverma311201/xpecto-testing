const crypto = require("crypto");
const mongoose = require("mongoose");
const Team = require("../models/eventTeamModel");
const Game = require("../models/eventModel");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

// asumption req.user coming from previos middleware

function generateCode(id) {
  const randomNumber = crypto.randomBytes(6).toString("hex");
  return `${id}-${Date.now()}-${randomNumber}`;
}

exports.attachCurrentUser = (req, res, next) => {
  req.user = { id: req.body.userId };
  next();
};

exports.getAll = catchAsync(async (req, res, next) => {
  const teams = await Team.find().populate("creater");
  res.status(201).json({
    status: "success",
    result: teams.length,
    data: {
      teams,
    },
  });
});

exports.getAllRegisteredTeamsByGameId = catchAsync(async (req, res, next) => {
  const teams = await Team.find({ game: req.params.id });
  res.status(201).json({
    status: "success",
    result: teams.length,
    data: {
      teams,
    },
  });
});
exports.getAllRegisteredTeamsByCreaterId = catchAsync(
  async (req, res, next) => {
    const teams = await Team.find({ creater: req.params.id })
      .populate("creater")
      .populate("players")
      .populate("game");
    res.status(201).json({
      status: "success",
      result: teams.length,
      data: {
        teams,
      },
    });
  }
);

exports.getAllRegisteredTeamsByUserIdExcludingOwnCreatedTeam = catchAsync(
  async (req, res, next) => {
    const userId = req.params.id;
    const userDb = await User.findById(userId);
    const teams = await Team.find({
      _id: {
        $in: userDb.registeredTeams,
      },
    });
    res.status(201).json({
      status: "success",
      result: teams.length,
      data: {
        teams,
      },
    });
  }
);

exports.getTeamsByTeamId = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: {
      team,
    },
  });
});

// require inside body teamName
exports.create = catchAsync(async (req, res, next) => {
  const isTeamNameExist = await Team.findOne({ teamName: req.body.teamName });
  if (isTeamNameExist) {
    return next(
      new AppError("Team name already exists! please try another name", 400)
    );
  }

  const code = generateCode(req.user.id);
  const newTeam = await Team.create({
    creater: req.user.id,
    teamName: req.body.teamName,
    code,
    players: req.user.id,
  });

  const popTeam = await Team.findById(newTeam._id).populate("creater");

  // add team id in user model
  const userDb = await User.findById(req.user.id);
  userDb.headOfTeams.push(newTeam.id);
  await userDb.save();

  res.status(201).json({
    status: "success",
    data: {
      popTeam,
      code,
    },
  });
});

// require inside body teamCode, playerId
// expiry code feature is disabled
exports.addPlayer = catchAsync(async (req, res, next) => {
  const teamCode = req.body.teamCode;

  // check if code is valid
  const team = await Team.findOne({
    code: teamCode,
    // expiry: { $gt: Date.now() },
  });
  if (!team) {
    return next(new AppError("Invalid Code", 400));
  }

  // check if player already in a team
  const playerId = req.user.id;
  let isPlayerPresent = false;
  team.players.forEach((doc) => {
    if (doc.id === playerId) {
      isPlayerPresent = true;
      return;
    }
  });
  if (isPlayerPresent) {
    return next(new AppError("You are already present in this team", 400));
  }

  currentGameId = team.game;
  if (currentGameId) {
    currentGame = await Game.findById(currentGameId);

    // check validity of a team
    curentTeamSize = team.players.length;

    if (currentGame.teamMaxSize < curentTeamSize + 1) {
      return next(
        new AppError(
          `You cannot be added to the team because Max Event Team Size is ${currentGame.teamMaxSize}`,
          400
        )
      );
    }
    // check Validity of a team
    if (
      curentTeamSize + 1 >= currentGame.teamMinSize &&
      curentTeamSize + 1 <= currentGame.teamMaxSize
    ) {
      team.isValid = true;
    }
  }

  // add player
  team.players.push(playerId);
  const updatedTeam = await team.save();

  // add team id in user model
  const userDb = await User.findById(playerId);
  userDb.registeredTeams.push(updatedTeam.id);
  await userDb.save();

  res.status(201).json({
    status: "success",
    data: {
      updatedTeam,
    },
  });
});

// only creater can add a game
// require inside body teamName, gameId
exports.addGame = catchAsync(async (req, res, next) => {
  const team = await Team.findOne({
    creater: req.user.id,
    teamName: req.body.teamName,
  });
  if (!team) {
    return next(new AppError("Only creater can register for an event", 400));
  }

  // check if game already in a team
  if (team.game) {
    return next(new AppError("Event already present", 400));
  }

  curentTeamSize = team.players.length;
  // console.log(req.body);
  // check if game can be added in a team
  currentGame = await Game.findById(req.body.gameId);
  if (currentGame.teamMaxSize < curentTeamSize) {
    return next(
      new AppError(
        `Event cannot be added because Max Event Team Size is ${currentGame.teamMaxSize} and Curently in a Team ${curentTeamSize} members are present`,
        400
      )
    );
  }

  // game can be added
  team.game = req.body.gameId;

  // check Validity of a team
  if (
    curentTeamSize >= currentGame.teamMinSize &&
    curentTeamSize <= currentGame.teamMaxSize
  ) {
    team.isValid = true;
  }

  const updatedTeam = await team.save();
  res.status(201).json({
    status: "success",
    data: {
      updatedTeam,
    },
  });
});

// only creater can generate a code
// require inside body teamName
exports.getCode = catchAsync(async (req, res, next) => {
  const team = await Team.findOne({
    creater: req.user.id,
    teamName: req.body.teamName,
  });
  // testing
  // const isTeamNameExist = await Team.findOne({ teamName: req.body.teamName });

  if (!team) {
    return next(new AppError("Only creater can generate a code", 400));
  }

  // increase expiry time by 1 year
  expireTimeInminutes = 365 * 24 * 60;
  team.expires = Date.now() + expireTimeInminutes * 60 * 1000;

  const code = generateCode(req.user.id);
  team.code = code;
  await team.save();

  res.status(200).json({
    status: "success",
    data: {
      code,
      expiresInMin: expireTimeInminutes,
    },
  });
});

// checking weather a team is already created for a particular event or not by a particular user
exports.teamForCurrentEvent = catchAsync(async (req, res, next) => {
  try {
    const creatorId = req.user.id;
    const eventId = req.params.eventId;

    const game = await Team.findOne({ game: eventId, players: creatorId });
    // console.log(creatorId, eventId);
    res.status(200).json({
      status: "success",
      game,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
});

exports.deleteTeam = catchAsync(async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.teamId).populate("creater");
    if (!team) {
      return next(new AppError("No Team Found by this ID"));
    }

    if (team.creater._id != req.user.id) {
      return next(
        new AppError("You are not creater so you can't delete the team")
      );
    }

    teamIdObj = new mongoose.Types.ObjectId(req.params.teamId);
    const deletedTeam = await Team.findByIdAndDelete(req.params.teamId);

    // deleting teamId from headOfTeams of creater
    const createrId = deletedTeam.creater;
    const userDb = await User.findById(createrId);
    newHeadOfTeams = userDb.headOfTeams.filter((id) => !id.equals(teamIdObj));
    userDb.headOfTeams = newHeadOfTeams;
    await userDb.save();

    // deleting teamId from registeredTeams of all users
    await Promise.all(
      deletedTeam.players.map(async (id) => {
        const userDb = await User.findById(id);
        newRegisteredTeams = userDb.registeredTeams.filter(
          (id) => !id.equals(teamIdObj)
        );
        userDb.registeredTeams = newRegisteredTeams;
        await userDb.save();
      })
    );

    res.status(200).json({
      status: "success",
      data: {
        deletedTeam,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
});
