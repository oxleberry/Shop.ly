

const mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/shirts");



module.exports.Shirt = require("./shirt.js");
module.exports.User = require("./user.js");
