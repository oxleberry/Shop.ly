

//  SETUP and CONFIGURATION -----------------------

//require express in our app
var express = require('express'),
    bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve the public directory as a static file directory
app.use(express.static('public'));

// // body parser config to accept our datatypes
// app.use(bodyParser.urlencoded({ extended: true }));


// Require the models directory in server.js
var db = require('./models');
var controllers = require('./controllers');


//  ROUTES --------------------------

// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


// create a new route for GET /api with callback controllers.api.index
// app.get('/api', controllers.api.index);



//  SERVER --------------------------

// tell the app to listen on a port so that the server will start
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
