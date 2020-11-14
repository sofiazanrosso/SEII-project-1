const mongoose= require('mongoose');

const Category= require('../models/category');

const announcementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: { type: String, required:true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required:true},
    content: {type: String, required:true},
    publish_date: {type: String, required:true},
    expiry_date: {type: String, required:true}
});

module.exports = mongoose.model('Announcement',announcementSchema);