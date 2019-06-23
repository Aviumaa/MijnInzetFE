const express = require("express");
const withAuth = require("../middelware/middleware");
const router = express.Router();
const courseController = require("../controllers/courseController");
const courseValidator = require("../validators/courseValidator");

router.get("/", withAuth, courseController.getAllCourses);

router.get("/:courseId", withAuth, courseValidator.validate('getCourseById'), courseController.getCourseById);

router.post("/", withAuth, courseValidator.validate('postCourse'), courseController.postCourse);

router.post("/withProgram", withAuth, courseValidator.validate('postCourseWithProgram'), courseController.postCourseWithProgram);

router.post("/addCourse", withAuth, courseValidator.validate('addCourseToProgram'), courseController.addCourseToProgram);

router.delete("/deleteAll/:id", withAuth, courseValidator.validate('destroyCoursesByProgramId'), courseController.destroyCoursesByProgramId);

module.exports = router;
