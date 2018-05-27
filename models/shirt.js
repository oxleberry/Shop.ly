
// shirt.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShirtSchema = new Schema({
    name: String,
    xs: Number,
    s: Number,
    m: Number,
    l: Number,
    xl: Number,
    xxl: Number,
    // size: [],
    // color: String,
    price: Number,
    image: String,
    description: String
 });

 // shirt.js
 var Shirt = mongoose.model('Shirt', ShirtSchema);



 // Exporting the shirts
 module.exports = Shirt;
