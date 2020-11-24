const mongoose = require('mongoose');

const Category = require('../models/category');

const flyerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: {
        type: {
            name: { type: String, required: true },
            mimeType: { type: String, required: true },
            buffer: { type: Buffer, required: true }
        },
        require: true
    },
    publish_date: { type: String, required: true },
    expiry_date: { type: String, required: true }
});

module.exports = mongoose.model('Flyer', flyerSchema);