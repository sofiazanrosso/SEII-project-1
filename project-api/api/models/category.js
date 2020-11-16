const mongoose= require('mongoose');

const Announcement= require('../models/announcement');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true},
    ann_ids: {type: Array, required: true},
    fly_ids: {type: Array, required: true}
});

module.exports = mongoose.model('Category',categorySchema);