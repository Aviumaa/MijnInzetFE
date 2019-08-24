const { UserVacancy, Vacancy, User, Periods } = require("../sequelize");
const jwt_decode = require("jwt-decode");

// POST new userVacancy
exports.postUserVacancy = (req, res) => {
  // retrieve bearer token and decode it
  let tokenArray = req
    .header("Authorization")
    .split(" ")
    .pop();
  let token = jwt_decode(tokenArray);

  // extract userID from the subject property
  let userId = token.sub.split("|").pop();

  UserVacancy.create({
    userId: userId,
    vacancyId: req.body.vacancyId,
    status: 0
  })
    .then(userVacancies => res.status(201).json(userVacancies))
    .catch(err => console.error(err));
};

// GET all vacancies of an user
exports.getVacanciesOfUser = (req, res) => {
  // retrieve bearer token and decode it
  let tokenArray = req
    .header("Authorization")
    .split(" ")
    .pop();
  let token = jwt_decode(tokenArray);

  // extract userID from the subject property
  let userId = token.sub.split("|").pop();

  UserVacancy.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: Vacancy,
        include: [
          {
            model: Periods,
            attributes: ["schoolYear", "quarter"]
          }
        ]
      }
    ]
  }).then(userResponse => {
    res.status(200).json(userResponse);
  });
};

// GET all accepted vacancies of an user
exports.getUserVacancyByStatus = (req, res) => {
  const status = req.params.status;

  // retrieve bearer token and decode it
  let tokenArray = req
    .header("Authorization")
    .split(" ")
    .pop();
  let token = jwt_decode(tokenArray);

  // extract userID from the subject property
  let userId = token.sub.split("|").pop();

  UserVacancy.findAll({
    where: {
      userId: userId,
      status: status
    },
    include: [
      {
        model: Vacancy,
        include: [
          {
            model: Periods,
            attributes: ["schoolYear", "quarter"]
          }
        ]
      }
    ]
  }).then(userResponse => {
    res.status(200).json(userResponse);
  });
};
