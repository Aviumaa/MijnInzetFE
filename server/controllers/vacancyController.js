const {
  Vacancy
} = require('../sequelize');

// GET all vacancies
exports.getVacancies = (req, res) => {
  Vacancy.findAll().then(vacancies => res.json(vacancies))
};