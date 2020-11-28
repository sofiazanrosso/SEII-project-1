const mongoose = require('mongoose');


// User Schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        immutable: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    display_name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    registration_date: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    last_login_date: {
        type: Date
    }
});

// User Model
const User = mongoose.model('User', userSchema);


module.exports = User;