
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    phone: String,
    e_mail: String,
    address: String,
    // cart will hold any selected _id of add to bag
    cart: [Number]
    // purchase_id: Number
 });


 var User = mongoose.model('User', UserSchema);


 // Exporting the shirts
 module.exports = User;
