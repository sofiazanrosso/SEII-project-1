const mongoose = require('mongoose');


// Announcement Schema
const announcementSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    author: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
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
        type: String
        //required: true
    },
    expiry_date: {
        type: String
        // required: true
    },
    hideAfter: {
        type: Boolean,
        default: true
    }
});

/*
const announcementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, require: true },
    author: { type: String, required:true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },      // reference to Category's model
    content: { type: String, required:true },
    publish_date: { type: String, required:true },
    expiry_date: { type: String },
    expired: {type: Boolean, default: false}
});
*/
// announcement model
const Announcement = mongoose.model('Announcement', announcementSchema);


module.exports = Announcement;