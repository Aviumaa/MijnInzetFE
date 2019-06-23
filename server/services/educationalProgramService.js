const {EducationalProgram} = require('../sequelize');

exports.getAllEducationalPrograms = async () => {
    try {
        return await EducationalProgram.findAll({
            where: {
                schoolRelated: 1
            }
        })
    } catch (e) {
        throw Error('Error while getting all educationalPrograms');
    }
}

exports.getAllNonEducationalPrograms = async () => {
    try {
        return await EducationalProgram.findAll({
            where: {
                schoolRelated: 0
            }
        })
    } catch (e) {
        throw Error('Error while getting all nonEducationPrograms');
    }
}

exports.getEducationalProgramById = async (id) => {
    try {
        return await EducationalProgram.findOne({
            where: {
                id: id
            }
        })
    } catch (e) {
        throw Error('Error while getting program with id: ' + id);
    }
}

exports.postEducationalProgram = async (title, year, study, schoolRelated) => {
    try {
        return await EducationalProgram.create({
            title: title,
            year: year,
            study: study,
            schoolRelated: schoolRelated
        })
    } catch (e) {
        throw Error('Error while posting new educationalProgram');
    }
}
