const VacancyService = require("../services/vacancyService");
const {validationResult} = require('express-validator');

// GET all vacancies
exports.getVacancies = async (req, res) => {
    try {
        const vacancies = await VacancyService.getVacancies();
        return res.status(200).json({status: 200, data: vacancies});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

// GET all vacancies with slots open
exports.getVacanciesOpen = async (req, res) => {
    try {
        const vacancies = await VacancyService.getVacanciesOpen();
        return res.status(200).json({status: 200, data: vacancies});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

// GET all vacancies with no open slots
exports.getVacanciesClosed = async (req, res) => {
    try {
        const vacancies = await VacancyService.getVacanciesClosed();
        return res.status(200).json({status: 200, data: vacancies});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }

};

// GET vacancy by id
exports.getVacancyById = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const vacancy = await VacancyService.getVacancyById(req.params.vacancyId);
        return res.status(200).json({status: 200, data: vacancy});
    }catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};


//POST a new Vacancy
exports.postVacancy = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const vacancy = await VacancyService.postVacancy(
            req.body.title,
            req.body.description,
            req.body.contactPerson,
            req.body.typeCourse,
            req.body.typeTask,
            req.body.contactHours,
            req.body.startDate,
            req.body.endDate,
            req.body.openSlots,
            req.body.period)
        return res.status(200).json({status: 200, message: "Created vacancy with id: " + vacancy.id});
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
