const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const vacancyController = require("../controllers/vacancyController");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authConfig = {
  domain: "dev-ihdwnd8l.eu.auth0.com",
  audience: "http://localhost:3000"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-ihdwnd8l.eu.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

router.get("/", checkJwt, vacancyController.getVacancies);

router.get("/open", withAuth, vacancyController.getVacanciesOpen);

router.get("/closed", withAuth, vacancyController.getVacanciesClosed);

router.get("/:vacancyId", withAuth, vacancyController.getVacancyById);

router.post("/", withAuth, vacancyController.postVacancy);

module.exports = router;
