const Model = require("../sequelize");
const sequelize = Model.sequelize;

const {
    EducationalProgram
} = require('../sequelize');

// GET all educationalPrograms
exports.getEducationalPrograms = (req, res) => {
    EducationalProgram.findAll().then(vacancies => res.json(vacancies))
};

//GET all courses associated with the given educationalCourseId
exports.getEducationalProgramCourses = (req, res) => {
    sequelize.query("SELECT c.id, c.title, c.ects, c.period, c.type, ep.title, ep.year, ep.study FROM courses c INNER JOIN educationalprogramscourses epc ON epc.course = c.id \n" +
        "INNER JOIN educationalprograms ep ON epc.educationalprogram = ep.id  WHERE epc.educationalprogram = :id",
        {replacements: { id: req.params.educationalProgramId }, type: sequelize.QueryTypes.SELECT}).then(Course => {
        res.status(200).json(Course)
    });
}

// GET educationalProgram by id
// exports.getEducationalProgramById = (req, res) => {
//     var educationalProgramId = req.params.educationalProgramId;
//     EducationalProgram.findOne({
//         where: {
//             id: educationalProgramId
//         }, include: [{
//             model: Model.Course,
//             attributes: ['id', 'type'],
//             through: {
//                 model: Model.EducationalProgramCourse
//             }
//         }]
//     }).then(educationalProgram => {
//         console.log(req.param)
//         res.status(200).json(educationalProgram)
//     });
// }

//POST new educationalProgram
// exports.postEducationalProgram = (req, res) => {
//     EducationalProgram.create({
//     })
//         .then(educationalProgram => res.status(201).json(educationalProgram))
//         .catch(err => console.error(err));
// };
