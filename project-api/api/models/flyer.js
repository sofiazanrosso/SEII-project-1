const mongoose = require('mongoose');


// Flyer Schema
const flyerSchema = mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
        name: {
            type: String,
            required: true
        },
        mimeType: {
            type: String,
            required: true
        },
        buffer: {
            type: Buffer,
            required: true
        }
    },
    publishDate: {
        type: String,
        required: true,
        default: Date.now
    },
    expiryDate: {
        type: String,
        required: true
    }
});


// Flyer Model
const Flyer = mongoose.model('Flyer', flyerSchema);


module.exports = Flyer;