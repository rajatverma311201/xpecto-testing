const Sponsor = require("./../models/sponsorModel");
const asyncHandler = require('express-async-handler');

exports.getAllSponsors = asyncHandler(async (req, res, next) => {
    const sponsors = await Sponsor.find();
    res.status(200).json({
        status: "success",
        data: sponsors
    });
});

exports.createSponsor = asyncHandler(async (req, res, next) => {
    const newSponsor = await Sponsor.create(req.body);
    res.status(200).json({
        status: "success",
        data: newSponsor
    });
});

exports.getSponsor = asyncHandler(async (req, res, next) => {
    const sponsor = await Sponsor.findById(req.params.id);

    if(!sponsor){
        res.status(400).json({
            status: "Failed! Sponsor does not exist."
        })
    } else {
        res.status(200).json({
            status: "success",
            data: sponsor
        });
    }
});


exports.updateSponsor = asyncHandler(async (req, res, next) => {
    const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!sponsor){
        res.status(400).json({
            status: "Failed! Sponsor does not exist."
        });
    } else {   
        res.status(200).json({
            status: "success",
            data: sponsor
        });
    }
});

exports.deleteSponsor = asyncHandler(async (req, res, next) => {
    const deletedSponsor = await Sponsor.findByIdAndDelete(req.params.id);

    if(!deletedSponsor){
        res.status(400).json({
            status: "Failed! Sponsor does not exist."
        })
    } else {   
        res.status(200).json({
            status: "success",
            data: null
        });
    }
});
