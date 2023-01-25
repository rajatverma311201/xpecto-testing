const TeamMember = require("../models/teamMemberModel");

exports.getAllTeamMembers = async (req, res) => {
  // console.log(req.params);
  try {
    const teamMembers = await TeamMember.find();
    res.status(200).json({
      status: "success",
      data: teamMembers,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTeamMember = async (req, res) => {
  try {
    const tempMember = await TeamMember.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: tempMember,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createTeamMember = async (req, res) => {
  // console.log(req.body);
  try {
    const newTeamMember = await TeamMember.create(req.body);
    res.status(201).json({
      status: "success",
      data: newTeamMember,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const updateedTeamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    // console.log(updateedTeamMember);
    res.status(200).json({
      status: "success",
      data: updateedTeamMember,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAllTeamMembers = async (req, res) => {
  try {
    await TeamMember.deleteMany();

    res.status(200).json({
      status: "success",
      message: "Successfully deleted all Team Members",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const deletedMember = await TeamMember.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Successfully deleted Team Member",
      data: deletedMember,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
