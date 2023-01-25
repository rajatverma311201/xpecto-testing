const User = require("../models/userModel");

exports.getOneUser = async (req, res, next) => {
  try {
    const usr = req.user;
    res.status(200).json({
      status: "success",
      user: usr,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateUserDetails = async (req, res, next) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.user._id }, req.body, {
      new: true,
      runValidators: true,
    });

    // send response
    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
