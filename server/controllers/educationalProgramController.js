const {EducationProgramService} = require('../services/educationalProgramService');
const {validationResult} = require('express-validator');

// GET all educationalPrograms
exports.getAllEducationalPrograms = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const program = await EducationProgramService.getAllEducationalPrograms();
        return res.status(200).json({status: 200, data: program});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

// GET all educationalPrograms with their courses
exports.getAllEducationalProgramsWithCourses = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const program = await EducationProgramService.getAllEducationalProgramsWithCourses();
        return res.status(200).json({status: 200, data: program});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

// GET all non school related educationalPrograms
exports.getAllNonEducationalPrograms = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const program = await EducationProgramService.getAllNonEducationalPrograms();
        return res.status(200).json({status: 200, data: program});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

// GET all non school related educationalPrograms with courses
exports.getAllNonEducationalProgramsWithCourses = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const program = await EducationProgramService.getAllNonEducationalProgramsWithCourses();
        return res.status(200).json({status: 200, data: program});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

// GET educationalProgram by id
exports.getEducationalProgramById = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const program = await EducationProgramService.getEducationalProgramById(req.params.educationalProgramId);
        return res.status(200).json({status: 200, data: program});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.getEducationalProgramByIdWithCourses = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const program = await EducationProgramService.getEducationalProgramByIdWithCourses(req.params.educationalProgramId);
        return res.status(200).json({status: 200, data: program});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

//POST new educationalProgram
exports.postEducationalProgram = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const program = await EducationProgramService.postEducationalProgram(
            req.body.title,
            req.body.year,
            req.body.study,
            req.body.schoolRelated);
        return res.status(201).json({status: 201, message: "Successfully created program with id: " + program.id});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

validationCheck = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
}
