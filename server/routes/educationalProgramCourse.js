const express = require("express");
const router = express.Router();
const educationalProgramCourseController = require("../controllers/educationalProgramCourseController");
const withAuth = require("../middelware/middleware");

router.get(
  "/",
  withAuth,

  educationalProgramCourseController.getEducationalProgramCourses
);

router.get(
  "/:educationalProgramId",
  withAuth,

  educationalProgramCourseController.getEducationalProgramCoursesById
);

router.post(
  "/",
  withAuth,

  educationalProgramCourseController.postEducationalProgramCourse
);

module.exports = router;
