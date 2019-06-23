const { param, body } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'getEducationalProgramById': {
            return [
                param('educationalProgramId', 'Id must be a numeric value').exists().isNumeric(),
            ]
        }
        case 'postEducationalProgram': {
            return [
                body('title', 'Title is required').exists(),
                body('year', 'Year must be a numeric value').isNumeric(),
                body('study'),
                body('schoolRelated', 'SchoolRelated must be filled').exists()
            ]
        }
    }
}
