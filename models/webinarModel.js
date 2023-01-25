const mongoose = require("mongoose");

const webinarSchema = mongoose.Schema({
    // write your schema here
    title :
    {
        type : String,
        required: [true, "Webinar must have a title"],
    },
    speakers: [
        {
          name: {
            type: String,
            required: [true, "Speaker must have a name"],
          },
          photo: String,
          about: String,
        },
      ],
      description: {
        type: String,
        trim: true,
      },
});

const Webinar = mongoose.model("Webinar", webinarSchema);

module.exports = Webinar;
