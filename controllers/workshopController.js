const Workshop = require("./../models/workshopModel");
const asyncHandler = require("express-async-handler");

exports.getAllWorkshops = asyncHandler(async (req, res, next) => {
  const Workshops = await Workshop.find();
  res.status(200).json({
    status: "success",
    data: Workshops,
  });
});

exports.createWorkshop = asyncHandler(async (req, res, next) => {
  const newWorkshop = await Workshop.create(req.body);

  res.status(200).json({
    status: "success",
    data: newWorkshop,

  });

});

exports.getWorkshop = asyncHandler(async (req, res, next) => {
  const workshop = await Workshop.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: workshop,
  });
});

exports.updateWorkshop = asyncHandler(async (req, res, next) => {
  const doc = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    res.status(400).json({
      status: "Failed! The Workshop does not exist.",
    });
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.deleteWorkshop = asyncHandler(async (req, res, next) => {
  const doc = await Workshop.findByIdAndDelete(req.params.id);

  if (!doc) {
    res.status(400).json({
      status: "Failed! The Workshop does not exist.",
    });
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
