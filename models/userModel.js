const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    // teamId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "team",
    // },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 0,
    },
    phoneNumber: {
        type: Number,
        // required: true,
    },
    fullName: {
        type: String,
    },
    collegeName: {
        type: String,
    },
    degree: {
        type: String,
    },
    branch: {
        type: String,
    },
    referralCode: {
        type: String,
    },
});

 
const User =mongoose.model("UserDetails", UserSchema);

module.exports = User;
