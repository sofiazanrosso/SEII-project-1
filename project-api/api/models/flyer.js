const mongoose = require('mongoose');


// Flyer Schema
const flyerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    content: { type: String, required: true },
    publish_date: { type: String, required: true },
    expiry_date: { type: String, required: true }
});

// Flyer Model
const Flyer = mongoose.model('Flyer', flyerSchema);


module.exports = Flyer;