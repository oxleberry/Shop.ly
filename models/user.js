
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    e_mail: String,
    address: String,
    cart: [Number]
 });


 var User = mongoose.model('User', UserSchema);


 // Exporting the shirts
 module.exports = User;
