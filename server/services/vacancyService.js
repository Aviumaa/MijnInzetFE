const {Vacancy, Periods, VacancyPeriods} = require("../sequelize");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;


exports.getVacancies = async () => {
    try {
        return await Vacancy.findAll({
                include: [
                    {
                        model: Periods,
                        attributes:
                            [
                                "schoolYear",
                                "quarter"
                            ]
                    }
                ]
            }
        )
    } catch (e) {
        throw Error('Error while getting all vacancies')
    }
}

exports.getVacanciesOpen = async () => {
    try {
        return await Vacancy.findAll({
            where: {
                openSlots: {
                    [Op.not]: 0
                }
            },
            include: [
                {
                    model: Periods,
                    attributes:
                        [
                            "schoolYear",
                            "quarter"
                        ]
                }
            ]
        })
    } catch (e) {
        throw Error('Error while getting all open vacancies');
    }
}

exports.getVacanciesClosed = async () => {
    try {
        return await Vacancy.findAll({
            where: {
                openSlots: 0
            },
            include: [
                {
                    model: Periods,
                    attributes:
                        [
                            "schoolYear",
                            "quarter"
                        ]
                }
            ]
        })
    } catch (e) {
        throw Error('Error while getting all closed vacancies');
    }
}

exports.getVacancyById = async (vacancyId) => {
    try {
        return await Vacancy.findOne({
            where: {
                id: vacancyId
            },
            include: [
                {
                    model: Periods,
                    attributes:
                        [
                            "schoolYear",
                            "quarter"
                        ]
                }
            ]
        })
    } catch (e) {
        throw Error('Error while getting vacancy by id');
    }
}

exports.postVacancy = async (title, description, contactPerson, typeCourse, typeTask,
                             contactHours, startDate, endDate, openSlots, period) => {
    try {
        return await Vacancy.create({
            title: title,
            description: description,
            contactPerson: contactPerson,
            typeCourse: typeCourse,
            typeTask: typeTask,
            contactHours: contactHours,
            startDate: startDate,
            endDate: endDate,
            openSlots: openSlots,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        //Split the multiple periods
        //TODO make this so the actual periods get used
        // const periods = period.split(',');
        // for(var i = 0; i < periods.length; i++) {
        //     VacancyPeriods.create({
        //         periodId: i,
        //         vacancyId: vacancy.id
        //     })
        // }
    } catch (e) {
        throw Error('Error while creating new vacancy');
    }
}
