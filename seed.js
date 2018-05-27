
var db = require("./models");

var shirtsList =[
  // data here soon!
];

db.Shirt.remove({}, function(err, shirts){
  // code in here runs after all albums are removed
  db.Shirt.create(shirtsList, function(err, shirts){
    // code in here runs after all albums are created
    if (err) { return console.log('ERROR', err); }
    console.log("all shirts:", shirts);
    console.log("created", shirts.length, "shirts");
    process.exit();
  });
});
