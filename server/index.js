const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middelware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const users = require("./routes/users");
const vacancies = require("./routes/vacancies");
const roles = require("./routes/roles");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
const {
  User,
  Course,
  Role,
  Timeslot,
  WeekSchedule,
  Vacancy
} = require("./sequelize");
const bodyParser = require("body-parser");

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-Type", "application/json");

  next();
});

app.set("view engine", "pug");
app.set("views", "./views");

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true
  })
); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());
app.use(logger);
// app.use('/api/courses', courses);
// app.use('/', home);
app.use("/api/users", users);
app.use("/api/vacancies", vacancies);
app.use("/api/roles", roles);
// app.use('/api/auth', auth);

//Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
//console.log('Mail Password: ' + config.get('mail.password'));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled...");
}

dbDebugger("Connected to the database...");

const http = require("http");
const hostname = "0.0.0.0";
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
