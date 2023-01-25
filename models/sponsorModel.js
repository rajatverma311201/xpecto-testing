const mongoose = require("mongoose");

const sponsorSchema = mongoose.Schema({
    sponsorName: 
    {
        type: String,
        required: [true, "Sponsor must have a name"],
        unique: [true, "Sponsor with same name already exists"]
    },
    sponsorTier:
    {
        type: String,
        required: [true, "Every Sponsor must have a tier"],
    },
    sponsorLogo:
    {
        type: String,
        required: [true, "Every Sponsor must have a logo"],
    },
    sponsorDescription:
    {
        type: String,
        required: [true, "Every Sponsor must have a description"]
    },
    createdAt:
    {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

module.exports = Sponsor;
