

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

//
// const designList = [
//     {
//         custom_text: 'Zombies',
//         design_title: 'Pancakes',
//         designer_name: 'Mochi',
//         image: 'images/precision.jpg'
//     }
// ];

// define a root route: localhost:3000/
app.get('/', (req, res) => {
  // res.send('Hello World');
//   res.sendFile('views/index.html' , { root : __dirname});
// });
    res.sendFile('views/category.html' , { root : __dirname});
});



// DATABASE
// GET ALL SHIRTS
app.get('/api/shirts', (req, res) => {
  // send all shirts as JSON response
  db.Shirt.find( (err, shirts) => {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    console.log('Get all ' + shirts);
    res.json(shirts);
  });
});

// CREATE
app.post('/api/shirts', (req, res) => {
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
app.get('/api/shirts/:id', (req, res) => {
});

// update for show page
app.put('/api/shirts/:id', (req, res) => {
    // get todo id from url params (`req.params`)
    // let shirtId = req.params.id;
    // // get update body from req.body
    // let updateBody = req.body;
    // // find and update the todos's attributes
    // db.Shirt.findOneAndUpdate({ _id: shirtId }, updateBody, {new:true}, (err, updatedShirt) => {
    //     if(err) { return console.log(err) }
    //     res.json(updatedShirt);
    // });
});

// delete
app.put('/api/shirts/:id', (req, res) => {
});

// searches
app.get('/api/shirts/?q=title', (req, res) => {
});

//  SERVER --------------------------

// tell the app to listen on a port so that the server will start
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is running on http://localhost:3000/');
});
