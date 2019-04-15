const { Timeslot } = require("../sequelize");

// GET all timeslots from the authenticated user
exports.getTimeslots = (req, res) => {
  Timeslot.findAll({
    where: {
      user_id: 1
    }
  }).then(timeslots => res.json(timeslots));
};
