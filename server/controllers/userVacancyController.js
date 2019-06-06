const { UserVacancy } = require("../sequelize");

// GET all userVacancies
exports.getUserVacancies = (req, res) => {
  UserVacancy.findAll().then(vacancies => res.json(vacancies));
};

// GET userVacancy by id
exports.getUserVacancyById = (req, res) => {
  var vacancyId = req.params.vacancyId;
  UserVacancy.findOne({
    where: {
      id: vacancyId
    }
  }).then(userResponse => {
    console.log(req.param);
    res.status(200).json(userResponse);
  });
};

//POST new userVacancy
exports.postUserVacancy = (req, res) => {
  UserVacancy.create({
    user: req.body.userId,
    vacancy: req.body.vacancyId
  })
    .then(userVacancies => res.status(201).json(userVacancies))
    .catch(err => console.error(err));
};
