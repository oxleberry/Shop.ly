

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost");


// models/index.js
module.exports.Shirt = require("./shirt.js");
module.exports.User = require("./user.js");
module.exports.Design = require("./design.js");
