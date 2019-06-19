const { Course } = require("../sequelize");

const {
    EducationalProgramCourse
} = require('../sequelize');

// GET all courses
exports.getCourses = (req, res) => {
  Course.findAll().then(courses => res.json(courses));
};

// GET course by id
exports.getCourseById = (req, res) => {
  Course.findOne({
    where: {
      id: req.params.courseId
    }
  }).then(course => {
    res.status(200).json(course);
  });
};

//POST new course
exports.postCourse= (req, res) => {

    const newCourse = Course.create({
        title: req.body.title,
        ects: req.body.ects,
        period: req.body.period,
        type: req.body.type
    }).then(function(result){
        EducationalProgramCourse.create({
            educationalProgramId: req.body.educationalProgramId,
            courseId: result.id
        })
        .then(course => res.status(201).json(course))
    })
};

//DELETE all existing courses by program course id
exports.destroyCoursesByProgramId = (req, res) => {
    EducationalProgramCourse.destroy({
        where: {
            educationalProgramId: req.params.id
        }
    }).then(course => res.status(201).json(course))
    .catch( error => {
        console.log(error);
    })
}
