const mongoose = require("mongoose");

const workshopSchema = mongoose.Schema({
  // write your schema here
  title: {
    type: String,
    required: [true, "Workshop must have a title"],
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  speakers: [
    {
      name: {
        type: String,
        required: [true, "Speaker must have a name"],
      },
      photo: String,
      about : String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  },

});

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
