const mongoose = require('mongoose');


// general schema for a flyer
const flyerSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
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
        type: String,
        required: true

        /*name: {
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
        }*/
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


// flyer model
const Flyer = mongoose.model('Flyer', flyerSchema);


module.exports = Flyer;