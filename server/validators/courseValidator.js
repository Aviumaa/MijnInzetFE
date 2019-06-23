const { param, body } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'getCourseById': {
            return [
                param('courseId', 'Id must be a numeric value').exists().isNumeric(),
            ]
        }
        case 'postCourse': {
            return [
                body('title','Title must atleast be 2 characters long').exists().isLength({min: 2}),
                body('ects','Ects must have a numeric value').isNumeric(),
                body('period','').isIn(['Blok 1', 'Blok 2', 'Blok 3', 'Blok 4', 'Sem 1', 'Sem 2']),
                body('type','Type is required').exists()
            ]
        }
        case 'postCourseWithProgram': {
            return [
                body('title','Title must atleast be 2 characters long').exists().isLength({min: 2}),
                body('ects','Ects must have a numeric value').isNumeric(),
                body('period','').isIn(['Blok 1', 'Blok 2', 'Blok 3', 'Blok 4', 'Sem 1', 'Sem 2']),
                body('type','Type is required').exists(),
                body('educationalProgramId', 'ProgramId is required').exists().isNumeric().withMessage('Id must be a numeric value')
            ]
        }
        case 'destroyCoursesByProgramId': {
            return [
                param('id', 'Id must be a numeric value').exists().isNumeric()
            ]
        }
    }
}
