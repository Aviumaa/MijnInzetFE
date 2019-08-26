const { Timeslot } = require("../sequelize");
const utils = require("./utils");

// GET all timeslots from the authenticated user
exports.getTimeslots = (req, res) => {
  const userId = utils.getUserIDFromToken(req);

  Timeslot.findAll({
    where: {
      userId: userId
    }
  }).then(timeslots => res.json(timeslots));
};

// Update schedule of the user
exports.updateTimeslots = (req, res) => {
  const userId = utils.getUserIDFromToken(req);

  Timeslot.destroy({
    where: {
      userId: userId
    }
  });

  for (let i = 0; i < req.body.timeslots.length; i++) {
    let splitDate = req.body.timeslots[i].split("-");

    Timeslot.create({
      start_time: splitDate[1],
      day_of_week: splitDate[0],
      userId: userId
    })
      .then(timeslots => res.status(200).send(console.log("updated")))
      .catch(err => res.status(400).send(console.error(err)));
  }
};
