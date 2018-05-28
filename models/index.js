

const mongoose = require("mongoose");
// path where the database will go
mongoose.connect("mongodb://localhost/designs");

// const Design = require('./design');
// exports.Design = Design;

// models/index.js
module.exports.Shirt = require("./shirt.js");
module.exports.User = require("./user.js");
module.exports.Design = require("./design.js");
