

//  SETUP and CONFIGURATION -----------------------

//require express in our app
const express = require('express');
const bodyParser = require('body-parser');

// generate a new express app and call it 'app'
const app = express();
// Require the models directory in server.js
const db = require('./models');
// const controllers = require('./controllers');


// serve the public directory as a static file directory
app.use(express.static('public'));

// // body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


//  ROUTES --------------------------

// create a new route for GET /api with callback controllers.api.index
// app.get('/api', controllers.api.index);


const designList = [
    {
        custom_text: 'Zombies',
        design_title: 'Pancakes',
        designer_name: 'Mochi',
        image: 'images/precision.jpg'
    }
];

// define a root route: localhost:3000/
app.get('/', (req, res) => {
  // res.send('Hello World');
//   res.sendFile('views/index.html' , { root : __dirname});
// });
    res.sendFile('views/testing.html' , { root : __dirname});
});



// DATABASE
// GET ALL DESIGNS
app.get('/api/designs', (req, res) => {
  // send all designs as JSON response
  db.Design.find( (err, designs) => {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    console.log('Get all ' + designs);
    res.json(designs);
  });
});

// CREATE
app.post('/api/designs', (req, res) => {
      // let newDesign = req.body;
      // newDesign.create( newDesign, (err, newDesignSuccess) => {
          // if (err) {
          //   console.log("create error: " + err);
          //   res.sendStatus(500);
          // }
      //     res.json(newDesignSuccess);
      // });
      let createDesign = new db.Design ({
          custom_text: req.body.custom_text,
          design_title: req.body.design_title,
          designer_name: req.body.designer_name
      });
      // create new book in db
      createDesign.save( {}, (err, newDesignSuccess) => {
          if (err) {
            console.log("create error: " + err);
            res.sendStatus(500);
          }
          console.log("SERVER CREATE" + newDesignSuccess);
          res.json(newDesignSuccess);
      });
});

// get one design
app.get('/api/designs/:id', (req, res) => {
});

// update
app.put('/api/designs/:id', (req, res) => {
});

// delete
app.put('/api/designs/:id', (req, res) => {
});

// searches
app.get('/api/designs/?q=title', (req, res) => {
});

//  SERVER --------------------------

// tell the app to listen on a port so that the server will start
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is running on http://localhost:3000/');
});
