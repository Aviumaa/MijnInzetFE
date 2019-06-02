const startupDebugger = require("debug")("app:startup");
const morgan = require("morgan");
const logger = require("./middelware/logger");
const users = require("./routes/users");
const vacancies = require("./routes/vacancies");
const timeslots = require("./routes/timeslots");
const userVacancy = require("./routes/userVacancies");
const roles = require("./routes/roles");
const auth = require("./routes/auth");
const course = require("./routes/course");
const educationalProgram = require("./routes/educationalProgram");
const educationalProgramCourse = require("./routes/educationalProgramCourse");
const express = require("express");
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
// const {
//   User,
//   Course,
//   Role,
//   Timeslot,
//   WeekSchedule,
//   Vacancy,
//   UserVacancy,
//   EducationalProgram,
//   EducationalProgramCourse
// } = require("./sequelize");
const bodyParser = require("body-parser");

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
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
  // Pass to next layer of middleware
  next();
});

app.set("views", "./views");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));
app.use(logger);
app.use("/api/userVacancies", userVacancy);
app.use("/api/users", users);
app.use("/api/vacancies", vacancies);
app.use("/api/timeslots", timeslots);
app.use("/api/roles", roles);
app.use("/api/auth", auth);
app.use("/api/course", course);
app.use("/api/educationalProgram", educationalProgram);
app.use("/api/educationalProgramCourse", educationalProgramCourse);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled...");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
