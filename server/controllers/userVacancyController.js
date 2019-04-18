const {
    userVacancy
} = require('../sequelize');

// GET all userVacancies
exports.getUserVacancies = (req, res) => {
    userVacancy.findAll().then(vacancies => res.json(vacancies))
};

// GET userVacancy by id
exports.getUserVacancyById = (req, res) => {
    var vacancyId = req.params.vacancyId;
    userVacancy.findOne({
        where:{
            id: vacancyId
        }
    }).then(userResponse => {
        console.log(req.param)
        res.status(200).json(userResponse)
    });
}

//POST new userVacancy
exports.postUserVacancy = (req, res) => {
    userVacancy.create({
        user: req.body.userId,
        vacancy: req.body.vacancyId
    })
        .then(userVacancies => res.json(userVacancies))
        .catch(err => console.error(err));
};
