

const mongoose = require("mongoose");
// path where the database will go
// mongoose.connect("mongodb://localhost/shirts");
// mongoose.connect("mongodb://localhost/designs");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/shirts");
// mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/users");
// mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/designs");

// 
// const Design = require('./design');
// exports.Design = Design;

// models/index.js
module.exports.Shirt = require("./shirt.js");
module.exports.User = require("./user.js");
module.exports.Design = require("./design.js");
