const {
  Vacancy
} = require('../sequelize');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

// GET all vacancies with slots open
exports.getVacanciesOpen = (req, res) => {
  Vacancy.findAll({
    where:{
        openSlots:{
          [Op.not]: 0
        }
    }
  }).then(userResponse =>{
    res.status(200).json(userResponse)
  })
}

// GET all vacancies with no open slots
exports.getVacanciesClosed = (req, res) => {
  Vacancy.findAll({
    where:{
      openSlots: 0
    }
  }).then(userResponse =>{
    res.status(200).json(userResponse)
  })
}