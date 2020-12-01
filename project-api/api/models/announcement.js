const mongoose= require('mongoose');

const Category= require('../models/category');

// general schema for an announcement
const announcementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, require: true },
    author: { type: String, required:true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },      // reference to Category's model
    content: { type: String, required:true },
    publish_date: { type: String, required:true },
    expiry_date: { type: String, required:true }
});

module.exports = mongoose.model('Announcement',announcementSchema);