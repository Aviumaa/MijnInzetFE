const { UserVacancy, Vacancy, User } = require("../sequelize");

// GET all userVacancies
exports.getUserVacancies = (req, res) => {
  UserVacancy.findAll().then(vacancies => res.json(vacancies));
};

// GET userVacancy by id
exports.getUserVacancyById = (req, res) => {
  const vacancyId = req.params.vacancyId;
  UserVacancy.findOne({
    where: {
      id: vacancyId
    }
  }).then(userResponse => {
    res.status(200).json(userResponse);
  });
};

//POST new userVacancy
exports.postUserVacancy = (req, res) => {
  UserVacancy.create({
    userId: req.body.userId,
    vacancyId: req.body.vacancyId,
    status: req.body.status
  })
    .then(userVacancies => res.status(201).json(userVacancies))
    .catch(err => console.error(err));
};

//get a users vacancies by userId
exports.getUserVacancyByUserId = (req, res) => {
  const userId = req.params.userId;
  User.findOne({
    where: {
      id: userId
    },
    include: [
      {
        model: Vacancy,
        attributes: [
          "id",
          "title",
          "description",
          "contactPerson",
          "schoolYear",
          "period",
          "typeCourse",
          "typeTask",
          "contactHours"
        ]
      }
    ]
  }).then(userResponse => {
    res.status(200).json(userResponse);
  });
};

// GET all accepted vacancies of an user
exports.getUserVacancyByUserIdAndStatus = (req, res) => {
  const userId = req.params.userId;
  const status = req.params.status;

  UserVacancy.findAll({
    where: {
      userId: userId,
      status: status
    },
    include: [{ model: Vacancy }]
  }).then(userResponse => {
    res.status(200).json(userResponse);
  });
};
