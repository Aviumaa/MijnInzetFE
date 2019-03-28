const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middelware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const { User, Course, Role, Timeslot, WeekSchedule } = require('./sequelize')
const bodyParser = require('body-parser')





app.set('view engine', 'pug');
app.set('views', './views');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
// app.use('/api/courses', courses);
// app.use('/', home);
// app.use('/api/users', users);
// app.use('/api/auth', auth);



app.post('/api/users', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    roleId: req.body.roleId 
  })
    .then(user => res.json(user)).catch(err => console.error(err))
})

app.get('/api/users', (req, res) => {
  User.findAll().then(users => res.json(users))
})


app.post('/api/roles', (req, res) => {
  Role.create({
    name: req.body.name
  })
    .then(user => res.json(user)).catch(err => console.error(err))
})

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('morgan enabled...')
}

dbDebugger('Connected to the database...');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));