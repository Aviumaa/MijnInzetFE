const { Timeslot } = require("../sequelize");

// GET all timeslots from the authenticated user
exports.getTimeslots = (req, res) => {
  Timeslot.findAll({
    where: {
      user_id: req.params.userId
    }
  }).then(timeslots => res.json(timeslots));
};

exports.updateTimeslots = (req, res) => {
  Timeslot.destroy({
    where: {
      user_id: req.params.userId
    }
  });

  for (var i = 0; i < req.body.timeslots.length; i++) {
    var splitDate = req.body.timeslots[i].split("-");
    console.log(splitDate);
    console.log("day: " + splitDate[0] + " time: " + splitDate[1]);

    Timeslot.create({
      start_time: splitDate[1],
      day_of_week: splitDate[0],
      user_id: req.params.userId
    }).then(timeslots => console.log("updated"));
  }
};
