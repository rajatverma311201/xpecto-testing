const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  // write your schema here
  image: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "The Team mamber must have a Name"],
  },
  role: {
    type: String,
    required: [true, "The Team mamber must have a Role"],
  },
  facebookLink: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
  linkedinLink: {
    type: String,
  },
});

const TeamMember = mongoose.model("TeamMember", teamSchema);

module.exports = TeamMember;
