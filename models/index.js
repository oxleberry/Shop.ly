

const mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/shirts");

// const Design = require('./design');
// exports.Design = Design;


module.exports.Shirt = require("./shirt.js");
module.exports.User = require("./user.js");
