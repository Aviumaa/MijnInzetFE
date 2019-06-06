const Model = require("../sequelize");
const sequelize = Model.sequelize;

const { EducationalProgram } = require("../sequelize");

// GET all educationalPrograms
exports.getEducationalPrograms = (req, res) => {
  EducationalProgram.findAll({
    where: {
      schoolRelated: 1
    }
  }).then(vacancies => res.json(vacancies));
};

exports.getNonEducationalPrograms = (req, res) => {
  EducationalProgram.findAll({
    where: {
      schoolRelated: 0
    }
  }).then(vacancies => res.json(vacancies));
};
// GET educationalProgram by id
exports.getEducationalProgramById = (req, res) => {
  var educationalProgramId = req.params.educationalProgramId;
  EducationalProgram.findOne({
    where: {
      id: educationalProgramId
    }
  }).then(educationalProgram => {
    res.status(200).json(educationalProgram);
  });
};

//POST new educationalProgram
exports.postEducationalProgram = (req, res) => {
  EducationalProgram.create({
    title: req.body.title,
    year: req.body.year,
    study: req.body.study
  })
    .then(educationalProgram => res.status(201).json(educationalProgram))
    .catch(err => console.error(err));
};
