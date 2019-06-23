const CourseService = require("../services/courseService");
const {validationResult} = require('express-validator');

// GET all courses
exports.getAllCourses = async (req, res) => {

    try {
        const courses = await CourseService.getAllCourses();
        return res.status(200).json({status: 200, data: courses});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

// GET course by id
exports.getCourseById = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const course = await CourseService.getCourseById(req.params.courseId)
        return res.status(200).json({status: 200, data: course});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

//POST new course
exports.postCourse = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const course = await CourseService.postCourse(req.body.title, req.body.ects, req.body.period, req.body.type);
        return res.status(200).json({status: 200, message: "Created new course with id" + course.id});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.addCourseToProgram = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        await CourseService.addCourseToProgram(req.body.courseId, req.body.educationalProgramId);
        return res.status(200).json({status: 200, message: "Successfully added course to program"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.postCourseWithProgram = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const course = await CourseService.postCourse(
            req.body.title,
            req.body.ects,
            req.body.period,
            req.body.type,
            req.body.educationalProgramId
        )
        return res.status(200).json({
            status: 200,
            message: "Successfully created and added course with id: " + course.id
        });
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

//DELETE all existing courses by program course id
exports.destroyCoursesByProgramId = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const course = CourseService.destroyCoursesByProgramId(req.params.id);
        return res.status(200).json({
            status: 200,
            message: "Deleted all courses associated with programId: " + req.params.id
        });
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

validationCheck = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
}
