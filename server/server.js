var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: "https://localhost:3000/"
}));

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

// All the routes
router.post('/enrolls', function (req, res) {
    console.log(req.query.coordinator);
    console.log(req.query.vacancyType)
    res.json({coordinator: req.query.coordinator, type: req.query.vacancyType});
});

app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server is running on port ' + port);
