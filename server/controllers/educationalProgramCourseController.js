const Model = require("../sequelize");
const sequelize = Model.sequelize;

const {
    EducationalProgramCourse
} = require('../sequelize');

// GET all educationalPrograms
exports.getEducationalProgramCourses = (req, res) => {
    EducationalProgramCourse.findAll().then(educationalProgramCourse => res.json(educationalProgramCourse))
};

//GET all courses associated with the given educationalCourseId
exports.getEducationalProgramCoursesById = (req, res) => {
    sequelize.query("SELECT c.id, c.title, c.ects, c.period, c.type, ep.title, ep.year, ep.study FROM courses c INNER JOIN educationalprogramscourses epc ON epc.course = c.id \n" +
        "INNER JOIN educationalprograms ep ON epc.educationalprogram = ep.id  WHERE epc.educationalprogram = :id",
        {replacements: {id: req.params.educationalProgramId}, type: sequelize.QueryTypes.SELECT}).then(Course => {
        res.status(200).json(Course)
    });
}

//POST new educationalProgramCourse
exports.postEducationalProgramCourse = (req, res) => {
    EducationalProgramCourse.create({
        educationalProgram: req.body.educationalProgram,
        course: req.body.course
    })
        .then(educationalProgramCourse => res.status(201).json(educationalProgramCourse))
        .catch(err => console.error(err));
};
