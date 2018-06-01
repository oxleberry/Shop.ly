

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShirtSchema = new Schema({
    name: String,
    price: Number,
    image: String,
    size: [Number],
    description: String
 });


 const Shirt = mongoose.model('Shirt', ShirtSchema);


 // Exporting the shirts
 module.exports = Shirt;
