const Model = require("../sequelize");
const { Course } = require("../sequelize");
const { EducationalProgramCourse } = require("../sequelize");

// GET all courses
exports.getCourses = (req, res) => {
  Course.findAll().then(courses => res.json(courses));
};

//Update course
exports.updateCourse = (req, res) => {
  Course.update(
    {
      title: req.body.title,
      ects: req.body.ects,
      period: req.body.period,
      type: req.body.type
    },
    {
      where: {
        id: req.params.courseId
      }
    }
  )
    .then(course => {
      res.status(200).json(course);
    })
    .catch(course => {
      res.status(course);
    });
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
exports.postCourse = (req, res) => {
   Course.create({
    title: req.body.title,
    ects: req.body.ects,
    period: req.body.period,
    type: req.body.type
  })
    .then(course => {
    res.status(200).json(course);
  })
}

//DELETE new course
  exports.deleteCourse = (req, res) => {
    Course.destroy({
      where: {
        id: req.params.courseId
      }
    })
      .then(course => {
        res.status(200).json(course);
      })
      .catch(course => {
        res.status(course);
        console.log("Error:" + course);
      });
  };

// DELETE all existing courses by program course id
exports.destroyCoursesByProgramId = (req, res) => {
  EducationalProgramCourse.destroy({
    where: {
      educationalProgramId: req.body.educationalProgramId
    }
  })
    .then(course => res.status(201).json(course))
    .catch(error => {
      console.log(error);
    });
};

// -> programid
// -> where course has programid
// -> destroy course


// // GET all educationalPrograms
// exports.getEducationalProgramCourses = (req, res) => {
//   EducationalProgramCourse.findAll().then(educationalProgramCourse =>
//     res.json(educationalProgramCourse)
//   );
// };

//GET all courses associated with the given educationalCourseId
exports.getEducationalProgramCoursesById = (req, res) => {
  console.log(req.params.educationalProgramId.toString());
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
// exports.postEducationalProgramCourse = (req, res) => {
//   EducationalProgramCourse.create({
//     educationalProgram: req.body.educationalProgram,
//     course: req.body.course
//   })
//     .then(educationalProgramCourse =>
//       res.status(201).json(educationalProgramCourse)
//     )
//     .catch(err => console.error(err));
// };
