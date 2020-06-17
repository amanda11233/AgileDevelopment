const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname : {
        type : String,
        required : [true, "Firstname is required"]
    },
    lastname : {
        type: String,
        required : [true, "lastname is required"]
    },
    location : {
        type : String,
        required : [true, "location is required"]
    },
    phone : {
        type : String,
        required : [true, "phone number is required"]
    },
    email : {
        type : String,
        required : [true, "email is required"]
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


const User = mongoose.model('user', UserSchema);

module.exports = User;