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

// UPDATE course
exports.doEdit = (req, res) => {
  let userId = req.params.userId;
  let roleId = req.body.roleId;

  Course.update(
    {
      username: req.body.username
    },
    {
      where: {
        id: req.params.courseId
      }
    }
  );

  UserRole.findOne({ where: { id: req.params.courseId} })
    .then(function(obj) {
      if (obj) {
        // update
        UserRole.update(
          {
            roleId: roleId
          },
          {
            where: {
              userId: userId
            },
            attributes: ["userId", "roleId"]
          }
        );
      } else {
        // insert
        UserRole.create({
          userId: userId,
          roleId: roleId
        });
      }
      res.status(200).send(console.log("updated"));
    })
    .catch(err => {
      res.status(400).send(console.error(err));
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
            educationalProgramId: req.body.educationalProgramId
        }
    }).then(course => res.status(201).json(course))
    .catch( error => {
        console.log(error);
    })
}