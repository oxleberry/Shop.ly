

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost");


// models/index.js
module.exports.Shirt = require("./shirt.js");
