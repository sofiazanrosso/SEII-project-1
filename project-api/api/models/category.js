const mongoose = require('mongoose');


// Category Schema
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }
});

// Category Model
const Category = mongoose.model('Category', categorySchema);


module.exports = Category;