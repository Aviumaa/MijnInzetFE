const {param, body} = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'getVacancyById': {
            return [
                param('vacancyId', 'Id must be a numeric value').exists().isNumeric()
            ]
        }
        case 'postVacancy': {
            return [
                body('title').exists(),
                body('description'),
                body('contactPerson'),
                body('typeCourse'),
                body('typeTask'),
                body('contactHours', 'Value must be a numeric value').isNumeric(),
                body('startDate'),
                body('endDate'),
                body('openSlots', 'Openslots needs to be filled').exists().isNumeric('Value must be numeric')
            ]
        }
        case 'addUserToVacancy': {
            return [
                param('vacancyId', 'vacancyId must be filled').exists().isNumeric().withMessage('vacancyId must be numeric'),
                param('userId', 'userId must be filled').exists().isNumeric().withMessage('userId must be numeric'),
                body('status', 'status must be numeric').isNumeric()
            ]
        }
    }
}
