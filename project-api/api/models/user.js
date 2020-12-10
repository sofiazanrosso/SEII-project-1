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
    tokenVersion: {
        type: Number,
        default: 0
    },
    displayName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    registrationDate: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    lastLoginDate: {
        type: Date
    }
});


userSchema.statics.incrementTokenVersion = function (_id) {
    return this.findOneAndUpdate(
        { _id: _id },
        { $inc: { 'tokenVersion': 1 } },
        { new: true }
    );
};


// User Model
const User = mongoose.model('User', userSchema);


module.exports = User;