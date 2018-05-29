
// shirt.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShirtSchema = new Schema({
    name: String,
    price: Number,
    image: String,
    // xs: Number,
    // s: Number,
    // m: Number,
    // l: Number,
    // xl: Number,
    // xxl: Number,
    size: [Number],
    // color: String,
    description: String
 });

 // shirt.js
 const Shirt = mongoose.model('Shirt', ShirtSchema);



 // Exporting the shirts
 module.exports = Shirt;
