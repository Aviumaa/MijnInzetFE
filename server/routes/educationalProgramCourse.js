const express = require("express");
const router = express.Router();
const educationalProgramCourseController = require("../controllers/educationalProgramCourseController");
//const withAuth = require("../middelware/middleware");

router.get(
  "/",
  
  educationalProgramCourseController.getEducationalProgramCourses
);

router.get(
  "/:educationalProgramId",
  
  educationalProgramCourseController.getEducationalProgramCoursesById
);

router.post(
  "/",
  
  educationalProgramCourseController.postEducationalProgramCourse
);

module.exports = router;
