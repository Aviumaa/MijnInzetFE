const { UserVacancy, Vacancy, Periods } = require("../sequelize");
const Model = require("../sequelize");
const utils = require("./utils");
const Sequelize = Model.sequelize;

// POST new userVacancy
exports.postUserVacancy = (req, res) => {
  const userId = utils.getUserIDFromToken(req);

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
  const userId = utils.getUserIDFromToken(req);

  Sequelize.query(
    `SELECT * FROM userVacancies INNER JOIN vacancies v on userVacancies.vacancyId = v.id where userId = :userId`,
    { replacements: { userId: userId }, type: Sequelize.QueryTypes.SELECT }
  ).then(response => {
    res.json(response);
  });
};

// GET all vacancies of an user filtered by status
exports.getUserVacancyByStatus = (req, res) => {
  const userId = utils.getUserIDFromToken(req);
  const status = req.params.status;

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
