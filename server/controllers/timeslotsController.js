const { Timeslot } = require("../sequelize");
const { user } = require("../models/user");

// GET all timeslots from the authenticated user
exports.getTimeslots = (req, res) => {
  Timeslot.findAll({
    where: {
      user_id: 1
    }
  }).then(timeslots => res.json(timeslots));
};

exports.updateTimeslots = (req, res) => {};
