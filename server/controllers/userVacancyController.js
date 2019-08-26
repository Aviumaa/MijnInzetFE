const { UserVacancy, Vacancy, Periods } = require("../sequelize");
const Model = require("../sequelize");
const jwt_decode = require("jwt-decode");
const Sequelize = Model.sequelize;

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

  Sequelize.query(
    `SELECT * FROM userVacancies INNER JOIN vacancies v on userVacancies.vacancyId = v.id where userId = :userId`,
    { replacements: { userId: userId }, type: Sequelize.QueryTypes.SELECT }
  ).then(response => {
    res.json(response);
  });
};

// GET all vacancies of an user filtered by status
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
