const { UserVacancy, Vacancy, User, Periods } = require("../sequelize");
const jwt_decode = require("jwt-decode");

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

//GET userVacancies by userId
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
          "typeCourse",
          "typeTask",
          "contactHours",
          "createdAt"
        ],
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
  let tokenArray = req.header("Authorization").split(" ");
  let token = jwt_decode(tokenArray[1]);

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
