const mongoose= require('mongoose');

const Announcement = require('../models/announcement');
const Category = require('../models/category');
const Flyer = require('../models/flyer');

const boardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ann_ids: {type: Array, required: true},
    fly_ids: {type: Array, required: true},
    cat_ids: {type: Array, required: true}
});

module.exports = mongoose.model('Board',boardSchema);