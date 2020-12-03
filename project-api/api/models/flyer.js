const mongoose= require('mongoose');

const Category= require('../models/category');

// general schema for a flyer
const flyerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {type: String, required:true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},      // reference to Category's model
    content: {type: String, required:true},
    publish_date: {type: String, required:true},
    expiry_date: {type: String, required:true},
    expired: {type: Boolean, default: false}
});

module.exports = mongoose.model('Flyer', flyerSchema);