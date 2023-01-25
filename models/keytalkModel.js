const mongoose = require("mongoose");

const keytalkSchema = mongoose.Schema({
  // write your schema here
  title: {
    type: String,
    required: [true, "Keytalk must have a title"],
  },
  speakers: [
    {
      name: {
        type: String,
        required: [true, "Speaker must have a name"],
      },
      photo: String,
      qualification: String,
    },
  ],
  duration: {
    type: Number,
    min: [0, "Duration Can't be less than 0!"],
    default: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    // required: [true, 'A tour must have a cover image'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Keytalk = mongoose.model("Keytalk", keytalkSchema);

module.exports = Keytalk;
