const express = require('express');
const router = express.Router();

const courses = [{
    id: 1,
    name: 'course1'
},
{
    id: 2,
    name: 'course2'
},
{
    id: 3,
    name: 'course3'
}
]

router.get('/', (req, res) => {
    res.send(courses);
});


router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { // 404 
        res.status(404).send('not found');
        return;
    }
    res.send(course);
});

router.post('/', (req, res) => {
    const {
        error
    } = validateCourse(req.body); //result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { // 404 
        return res.status(404).send('not found')
    }

    const {
        error
    } = validateCourse(req.body); //result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    //look up the course
    //not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { // 404 
        return res.status(404).send('not found')
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;