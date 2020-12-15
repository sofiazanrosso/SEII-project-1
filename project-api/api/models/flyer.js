const mongoose = require('mongoose');


// Flyer Schema
const flyerSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    author: {
        type: String,
        immutable: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    publishDate: {
        type: String,
        default: Date.now
    },
    expiryDate: {
        type: String
    },
    resMessage: {
        type: String,
        default: "image okay"
    },
    contact: {
        type: String
    }
});


// flyer model
const Flyer = mongoose.model('Flyer', flyerSchema);


module.exports = Flyer;