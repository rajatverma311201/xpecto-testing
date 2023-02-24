const Event = require("./../models/eventModel");
const User = require("./../models/userModel");
exports.getEvents = async (req, res) => {
  try {
    let allevents = await Event.find();

    allevents.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    context = {
      status: "success",
      result: allevents.length,
      data: allevents,
    };
    res.status(200).json(context);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getEvent = async (req, res) => {
  // console.log(">>",req.params)
  try {
    const event = await Event.findOne({ _id: req.params.id });
    context = {
      status: "success",
      data: event,
    };
    res.status(200).json(context);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
};
exports.addevent = async (req, res) => {
  try {
    const newdata = req.body;
    const response = Event.create(newdata);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ Error: error });
    // console.log("Erorr occure at event added")
  }
};

exports.updateEvent = async (req, res) => {
  try {
    // console.log(req.body,"bodu")
    const data = req.body;
    // console.log(data)
    const newdata = {
      $set: {
        club: data.club,
        info: data.info,
        name: data.info,
        shortsummary: data.shortsummary,
        longsummary: data.longsummary,
        event_image: data.event_image,
        rulebook_link: data.rulebook_link,
        description: data.description,
        problemset_link: data.problemset_link,
        createdAt: data.createdAt,
        start_time: data.start_time,
        end_time: data.end_time,
        prices: data.prices,
        coordinators: data.coordinators,
        teamMaxSize: data.teamMaxSize,
        teamMinSize: data.teamMinSize,
      },
    };
    // console.log(data.coordinators)
    const eventsid = req.params.id;
    const add = Event.updateOne({ _id: eventsid }, newdata);
    console.log(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ Error: error });
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    const eventsid = req.params.id;
    console.log(eventsid);
    const s = await Event.deleteOne({ _id: eventsid });
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ Error: error });
  }
};
