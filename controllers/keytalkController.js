const Keytalk = require("./../models/keytalkModel");
const asyncHandler = require("express-async-handler");

exports.getAllKeytalks = asyncHandler(async (req, res, next) => {
  const keyTalks = await Keytalk.find();
  res.status(200).json({
    status: "success",
    data: keyTalks,
  });
});

exports.createKeytalk = asyncHandler(async (req, res, next) => {
  const newKeytalk = await Keytalk.create(req.body);

  res.status(200).json({
    status: "success",
    data: newKeytalk,
  });
});

exports.getKeytalk = asyncHandler(async (req, res, next) => {
  const keytalk = await Keytalk.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: keytalk,
  });
});

exports.updateKeytalk = asyncHandler(async (req, res, next) => {
  const doc = await Keytalk.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    res.status(400).json({
      status: "Failed! The Keytalk does not exist.",
    });
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.deleteKeytalk = asyncHandler(async (req, res, next) => {
  const doc = await Keytalk.findByIdAndDelete(req.params.id);

  if (!doc) {
    res.status(400).json({
      status: "Failed! The Keytalk does not exist.",
    });
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
