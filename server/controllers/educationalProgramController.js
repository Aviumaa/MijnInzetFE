const Model = require("../sequelize");
const sequelize = Model.sequelize;

const {
    EducationalProgram
} = require('../sequelize');

// GET all educationalPrograms
exports.getEducationalPrograms = (req, res) => {
    EducationalProgram.findAll().then(vacancies => res.json(vacancies))
};

// GET educationalProgram by id
exports.getEducationalProgramById = (req, res) => {
    var educationalProgramId = req.params.educationalProgramId;
    EducationalProgram.findOne({
        where: {
            id: educationalProgramId
        }
    }).then(educationalProgram => {
        console.log(req.param)
        res.status(200).json(educationalProgram)
    });
}

//POST new educationalProgram
exports.postEducationalProgram = (req, res) => {
    EducationalProgram.create({
        title: req.body.title,
        year: req.body.year,
        study: req.body.study,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(educationalProgram => res.status(201).json(educationalProgram))
        .catch(err => console.error(err));
};
