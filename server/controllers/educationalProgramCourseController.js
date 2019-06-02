const Model = require("../sequelize");

const { EducationalProgramCourse } = require("../sequelize");

// GET all educationalPrograms
exports.getEducationalProgramCourses = (req, res) => {
  EducationalProgramCourse.findAll().then(educationalProgramCourse =>
    res.json(educationalProgramCourse)
  );
};

//GET all courses associated with the given educationalCourseId
exports.getEducationalProgramCoursesById = (req, res) => {
  const educationalProgramId = req.params.educationalProgramId;

  Model.EducationalProgram.findAll({
    where: {
      id: educationalProgramId
    },
    attributes: ["id", "title", "year", "study"],
    include: [
      {
        model: Model.Course,
        attributes: ["id", "title", "ects", "period", "type"]
      }
    ]
  }).then(Course => {
    console.log(req.params);
    res.status(200).json(Course);
  });
};

//POST new educationalProgramCourse
exports.postEducationalProgramCourse = (req, res) => {
  EducationalProgramCourse.create({
    educationalProgram: req.body.educationalProgram,
    course: req.body.course
  })
    .then(educationalProgramCourse =>
      res.status(201).json(educationalProgramCourse)
    )
    .catch(err => console.error(err));
};
