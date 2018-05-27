

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Shop.ly");


// models/index.js
module.exports.Book = require("./shirt.js");
