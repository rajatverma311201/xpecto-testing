const Webinar = require("./../models/webinarModel");
const asyncHandler = require("express-async-handler");


exports.getAllWebinars=async(req,res)=>{
    try {
       const allwebinars= await Webinar.find();
       context={
           status:"success",
           data: allwebinars
       }
       res.status(200).json(context);
    } catch (error) {
       res.status(400).json({Error:err});
    }
   }

exports.getWebinar=async(req,res)=>{
    try {
        const oneWebinar= await Webinar.findOne({_id:req.params.id});
    context={
        status:"success",
        data:oneWebinar
    }
    res.status(200).json(context);
    } catch (error) {
        res.status(400).json({Error:err}); 
    }
}
exports.updateWebinar = asyncHandler(async (req, res, next) => {
    const doc = await Webinar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!doc) {
      res.status(400).json({
        status: "Failed! The Webinar does not exist.",
      });
    }
  
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
  
  exports.deleteWebinar = asyncHandler(async (req, res, next) => {
    const doc = await Webinar.findByIdAndDelete(req.params.id);
  
    if (!doc) {
      res.status(400).json({
        status: "Failed! The Webinar does not exist.",
      });
    }
  
    res.status(200).json({
      status: "success",
      data: null,
    });
  });
  