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
const fs = require("fs");
const https = require("https");
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

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true
  })
); //key=value&key=value
app.use(express.static("public"));
app.use(logger);
// app.use('/api/courses', courses);
// app.use('/', home);
app.use("/api/users", users);
app.use("/api/vacancies", vacancies);
app.use("/api/roles", roles);

//Configuration
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled...");
}
dbDebugger("Connected to the database...");
// var key = fs.readFileSync("20181992_oege.ie.hva.nl.key");
// var cert = fs.readFileSync("20181992_oege.ie.hva.nl.cert");
// var options = {
//   key: key,
//   cert: cert,
//   passphrase: "goosb001"
// };

const http = require("http");
const hostname = "oege.ie.hva.nl";
const port = 8009;
console.log("hostname: " + hostname);
console.log("port: " + port);
https.createServer(app).listen(port, hostname, () => {
  console.log(`Server running at https://oege.ie.hva.nl/${hostname}:${port}/`);
});

//https://oege.ie.hva.nl:3307/api/vacancies/
