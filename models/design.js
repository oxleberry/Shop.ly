// design.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesignSchema = new Schema({
    custom_text: String,
    design_title: String,
    designer_name: String,
    image: String
 });


const Design = mongoose.model('Design', DesignSchema);


// Exporting the design
 module.exports = Design;
