const express = require("express");
//const withAuth = require("../middelware/middleware");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", courseController.getCourses);

router.get("/:courseId", courseController.getCourseById);

router.post("/", courseController.postCourse);

router.put("/:courseId", courseController.updateCourse);

router.post("/:courseId", courseController.getCourseById);

// post in plaats van delete want axios.delete werkte bij mij niet
router.post("/deleteAll", courseController.destroyCoursesByProgramId);

module.exports = router;
