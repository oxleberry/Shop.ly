// design.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DesignSchema = new Schema({
    custom_text: String,
    design_title: String,
    designer_name: String,
    image: String
 });


 var Design = mongoose.model('Design', DesignSchema);


// Exporting the design
 module.exports = Design;
