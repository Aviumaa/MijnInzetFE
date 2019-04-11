const {
  Vacancy
} = require('../sequelize');

// GET all vacancies
exports.getVacancies = (req, res) => {
  Vacancy.findAll().then(vacancies => res.json(vacancies))
};

// GET vacancy by id
exports.getVacancyById = (req, res) => {
  var vacancyId = req.params.vacancyId;
  Vacancy.findOne({
    where:{
      id: vacancyId
    }
  }).then(userResponse => {
    console.log(req.param)
    res.status(200).json(userResponse)
  })
}