const { Timeslot } = require("../sequelize");
const jwt_decode = require("jwt-decode");

// GET all timeslots from the authenticated user
exports.getTimeslots = (req, res) => {
  // retrieve bearer token and decode it
  let tokenArray = req.header("Authorization").split(" ");
  let token = jwt_decode(tokenArray[1]);

  // extract userID from the subject property
  let userId = token.sub.split("|").pop();

  Timeslot.findAll({
    where: {
      user_id: userId
    }
  }).then(timeslots => res.json(timeslots));
};

// Update schedule of the user
exports.updateTimeslots = (req, res) => {
  // retrieve bearer token and decode it
  let tokenArray = req.header("Authorization").split(" ");
  let token = jwt_decode(tokenArray[1]);

  // extract userID from the subject property
  let userId = token.sub.split("|").pop();

  Timeslot.destroy({
    where: {
      user_id: userId
    }
  });

  for (let i = 0; i < req.body.timeslots.length; i++) {
    let splitDate = req.body.timeslots[i].split("-");

    Timeslot.create({
      start_time: splitDate[1],
      day_of_week: splitDate[0],
      user_id: userId
    })
      .then(timeslots => res.status(200).send(console.log("updated")))
      .catch(err => res.status(400).send(console.error(err)));
  }
};
