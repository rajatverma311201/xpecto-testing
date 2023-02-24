const mongoose = require("mongoose");

// require Model PLayer, Game
// User
const teamSchema = new mongoose.Schema({
  creater: {
    type: mongoose.Schema.ObjectId,
    ref: "UserDetails",
    required: [true, "A creater must be required for a team"],
  },
  teamName: {
    type: String,
    unique: true,
    required: [true, "A unique team name is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  code: {
    type: String,
    required: [true, "without a code team cannot be created"],
    unique: true,
  },
  expires: {
    type: Number,
    default: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
  },
  isValid: {
    type: Boolean,
    default: false,
  },
  players: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "UserDetails",
    },
  ],
  game: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
});

teamSchema.pre(/^find/, function (next) {
  this.populate({
    path: "players",
    select: "-__v",
  });
  this.populate({
    path: "game",
    select: "-__v",
  });
  this.populate({
    path: "creater",
  });
  next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
