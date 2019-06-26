const express = require("express");
const withAuth = require("../middelware/middleware");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", withAuth, courseController.getCourses);

router.get("/:courseId", withAuth, courseController.getCourseById);

router.post("/", withAuth, courseController.postCourse);

router.put("/:courseId", withAuth, courseController.updateCourse);

router.delete("/:courseId", withAuth, courseController.deleteCourse);

// post in plaats van delete want axios.delete werkte bij mij niet
router.post("/deleteAll", withAuth, courseController.destroyCoursesByProgramId);

module.exports = router;
