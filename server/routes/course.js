const express = require("express");
const checkJwt = require("../middelware/middleware");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", checkJwt, courseController.getCourses);

router.get("/:courseId", checkJwt, courseController.getCourseById);

router.post("/", checkJwt, courseController.postCourse);

router.put("/:courseId", checkJwt, courseController.updateCourse);

router.delete("/:courseId", checkJwt, courseController.deleteCourse);

router.delete(
  "/deleteAll/:id",
  checkJwt,
  courseController.destroyCoursesByProgramId
);

router.get(
  "/program/:educationalProgramId",
  checkJwt,
  courseController.getEducationalProgramCoursesById
);

module.exports = router;
