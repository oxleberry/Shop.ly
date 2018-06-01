

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

// define a root route: localhost:3000/
app.get('/', (req, res) => {
  res.sendFile('views/index.html' , { root : __dirname});
});


// DATABASE
// GET ALL SHIRTS
app.get('/api/shirts', (req, res) => {
  db.Shirt.find( (err, shirts) => {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(shirts);
  });
});

// GET ALL USERS
app.get('/api/users', (req, res) => {
  db.User.find( (err, users) => {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(users);
  });
});

// CREATE
app.post('/api/users', (req, res) => {
      let createUser = new db.User ({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          phone: req.body.phone,
          e_mail: req.body.e_mail,
          address: req.body.address,
          cart: req.body.cart
      });
      createUser.save( {}, (err, newUserSuccess) => {
          if (err) {
            console.log("create error: " + err);
            res.sendStatus(500);
          }
          res.json(newUserSuccess);
      });
});

// get one design for details section
app.get('/api/shirts/:id', (req, res) => {
    // find shirt by button data-attr:
    let shirtId = req.params.id;
    db.Shirt.findOne({ _id: shirtId }, (err, foundShirt) => {
        if(err) { return console.log(err) }
        res.json(foundShirt);
    });
});

// update size inventory
app.put('/api/shirts/:id', (req, res) => {
    let invId = req.params.id;
    let updateBody = req.body;
    db.Shirt.findOneAndUpdate({ _id: invId }, updateBody, {new:true}, (err, updatedShirt) => {
        if(err) { return console.log(err) }
        res.json(updatedShirt);
    });
});

// delete
// didn't get to this
// app.delete('/api/shirts/:id', (req, res) => {
// });

// searches
// didn't get to this
// app.get('/api/shirts/?q=title', (req, res) => {
// });

//  SERVER --------------------------

// tell the app to listen on a port so that the server will start
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is running on http://localhost:3000/');
});
