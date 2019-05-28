const Model = require("../sequelize");

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
        where:{
            id: educationalProgramId
        }, include: [Model.Course]
    }).then(educationalProgram => {
        console.log(req.param)
        res.status(200).json(educationalProgram)
    });
}

//POST new educationalProgram
// exports.postEducationalProgram = (req, res) => {
//     EducationalProgram.create({
//     })
//         .then(educationalProgram => res.status(201).json(educationalProgram))
//         .catch(err => console.error(err));
// };
