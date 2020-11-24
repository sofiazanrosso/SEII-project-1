const mongoose= require('mongoose');

const Announcement= require('../models/announcement');
const Flyer = require('../models/flyer');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true},
    ann_ids: {type: Array, required: true},
    fly_ids: {type: Array, required: true}
    
    // si può fare?
    
    // ann_ids: {type: object, required: true, subjects: {
    //    ann: {
    //       ref: '../models/announcement'
    //    }
    //    // ref: Announcement
    // }}
    
});

module.exports = mongoose.model('Category',categorySchema);