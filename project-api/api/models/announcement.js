const mongoose = require('mongoose');


// Announcement Schema
const announcementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    content: { type: String, required: true },
    publish_date: { type: Date, required: true },
    expiry_date: { type: Date, required: true }
});

// Announcement Model
const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;