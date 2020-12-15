const mongoose = require('mongoose');


// Announcement Schema
const announcementSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publish_date: {
        type: String,
        required: true
    },
    expiry_date: {
        type: String,
        required: true
    },
    hide_after: {
        type: Boolean,
        default: true
    },
    contact: {
        type: String
    }
    
});


// announcement model
const Announcement = mongoose.model('Announcement', announcementSchema);


module.exports = Announcement;