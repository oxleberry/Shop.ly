

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    phone: String,
    e_mail: String,
    address: String,
    cart: []
 });


 const User = mongoose.model('User', UserSchema);


 // Exporting the shirts
 module.exports = User;
