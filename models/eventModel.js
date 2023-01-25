const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    club: {
        type: String,
        default:""
    },
    info: {
        type: String,
        default:""
    },
    name: {
        type: String,
        unique: true,
        default:""
    },

    shortsummary: {
        type: String,
        default:""
    },

    longsummary: {
        type: String,
        default:""
    },

    event_image: {
        type: String,
        default:""
    },
    rulebook_link: {
        type: String,
        default:""

    },

    description: {
        type: String,
        default:""
    },

    problemset_link: {
        type: String,
        default:""

    },
    submission_link: {
        type: String,
        default:""
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
            type: String,
            default:""
        },
        second: {
            type: String,
            default:""
        },
        third: {
            type: String,
            default:""
        },
        fourth:{
            type: String,
            default:""
        }
    },

    coordinators:[ {
            name: {
                type: String,
                default:""
            },
            contact: {
                type: String,
                default:""
            },
        
    }
    ],

    // registeredUsers: [
    //     {
    //         user_id: {
    //             type: String,
    // unique:true
    //         },
    //     },
    // ],
    teamMaxSize: {
        type: String,
        required: true,
        default:""
    },
    teamMinSize: {
        type: String,
        required: true,
        default:""
    },
});
;

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
