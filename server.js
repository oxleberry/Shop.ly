

//  SETUP and CONFIGURATION -----------------------

//require express in our app
const express = require('express');
const bodyParser = require('body-parser');

// generate a new express app and call it 'app'
const app = express();

// serve the public directory as a static file directory
app.use(express.static('public'));

// // body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


// Require the models directory in server.js
const db = require('./models');
// const controllers = require('./controllers');


//  ROUTES --------------------------

// TEST ROUTES
// const burgers = [
//   'Hamburger',
//   'Cheese Burger',
//   'Vegetable Burger'
// ];
//
// app.get("/api/burgers", (req, res) => {
//   //send all the burgers
//   res.json(burgers);
// });

//_______________
// ROUTES FROM URL
// http://localhost:3000/greetings/sharon
// app.get("/greetings/:name", (req, res) => {
//   res.send( "Hello, " + req.params.name );
// });

// http://localhost:3000/thank?name=sharon
app.get("/thank", (req, res) => {
  let name = req.query.name;
  res.send('Thank you, ' + name + '!');
});

// define a root route: localhost:3000/
app.get('/', (req, res) => {
  // res.send('Hello World');
  res.sendFile('views/index.html' , { root : __dirname});
});


// create a new route for GET /api with callback controllers.api.index
// app.get('/api', controllers.api.index);


// DATABASE
app.get('/api/designs', function (req, res) {
  // send all books as JSON response
  db.Design.find(function(err, designs){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(designs);
  });
});

// CREATE
app.post('/api/designs', (req, res) => {
      // let newDesign = req.body;
      // newDesign.create( newDesign, (err, newDesignSuccess) => {
      //     if(err) { return console.log(err) }
      //     res.json(newDesignSuccess);
      // });
      let createDesign = new db.Design ({
          custom_text: req.body.custom_text,
          design_title: req.body.design_title,
          designer_name: req.body.designer_name
      });
      // create new book in db
      createDesign.save( {}, (err, newDesignSuccess) => {
          if(err) { return console.log(err) }
          res.json(newDesignSuccess);
      });
});


//  SERVER --------------------------

// tell the app to listen on a port so that the server will start
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
