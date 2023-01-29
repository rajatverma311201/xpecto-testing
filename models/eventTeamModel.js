const mongoose = require("mongoose");

const eventTeamSchema = mongoose.Schema({
    name: { type: String, trim: true },
    head: [{ type: mongoose.Schema.ObjectId, ref: "User", unique: true }],
    registeredEvents: [
        { type: mongoose.Schema.ObjectId, ref: "Event", unique: true },
    ],
});

eventTeamSchema.pre(/^find/, function (next) {
    this.populate({
        path: "head",
        select: "-__v",
    });
    this.populate({
        path: "registeredEvents",
        select: "-__v",
    });
    next();
});

const EventTeam = mongoose.model("EventTeam", eventTeamSchema);

module.exports = EventTeam;
