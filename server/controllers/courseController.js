const Model = require("../sequelize");
const sequelize = Model.sequelize;

const {
    Course
} = require('../sequelize');

// GET all courses
exports.getCourses = (req, res) => {
    Course.findAll().then(courses => res.json(courses))
};

// GET course by id
exports.getCourseById = (req, res) => {
    Course.findOne({
        where: {
            id: req.params.courseId
        }
    }).then(course => {
        console.log(req.param)
        res.status(200).json(course)
    });
}

//POST new course
exports.postCourse= (req, res) => {
    Course.create({
        title: req.body.title,
        ects: req.body.ects,
        period: req.body.period,
        type: req.body.type
    })
        .then(course => res.status(201).json(course))
        .catch(err => console.error(err));
};
