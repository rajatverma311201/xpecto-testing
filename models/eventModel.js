const mongoose = require("mongoose");
const EventTeam = require("./eventTeamModel");
const User = require("./userModel");
const eventSchema = mongoose.Schema({
    club: {
        type: String,
        default: "",
        trim: true,
    },
    info: {
        type: String,
        default: "",
        trim: true,
    },
    name: {
        type: String,
        unique: true,
        default: "",
        trim: true,
    },

    shortsummary: {
        type: String,
        default: "",
        trim: true,
    },

    longsummary: {
        type: String,
        default: "",
        trim: true,
    },

    event_image: {
        type: String,
        default: "",
        trim: true,
    },
    rulebook_link: {
        type: String,
        default: "",
        trim: true,
    },

    description: {
        type: String,
        default: "",
        trim: true,
    },

    problemset_link: {
        type: String,
        default: "",
        trim: true,
    },
    submission_link: {
        type: String,
        default: "",
        trim: true,
    },

    createdAt: {
        type: String,
    },

    start_time: {
        day: {
            type: String,
        },
        time: {
            type: String,
        },
    },

    end_time: {
        day: {
            type: String,
        },
        time: {
            type: String,
        },
    },

    prices: {
        first: {
            type: Number,
            default: 0,
        },
        second: {
            type: Number,
            default: 0,
        },
        third: {
            type: Number,
            default: 0,
        },
        fourth: {
            type: Number,
            default: 0,
        },
    },

    coordinators: [
        {
            name: {
                type: String,
                default: "",
            },
            contact: {
                type: String,
                default: "",
            },
        },
    ],

    teamMaxSize: {
        type: String,
        required: true,
        default: "",
    },
    teamMinSize: {
        type: String,
        required: true,
        default: "",
    },
    isLive: {
        type: Boolean,
        default: false,
    },
    registeredUsers: [
        { type: mongoose.Schema.ObjectId, ref: "UserDetails", unique: true },
    ],
    registeredTeams: [
        { type: mongoose.Schema.ObjectId, ref: "EventTeam", unique: true },
    ],
});

eventSchema.pre(/^find/, function (next) {
    this.populate({
        path: "registeredUsers",
        select: "-__v",
    });
    this.populate({
        path: "registeredTeams",
        select: "-__v",
    });
    next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
