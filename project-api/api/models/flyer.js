const mongoose= require('mongoose');

const flyerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {type: String, required:true},
    category: {type: String, required:true},
    content: {type: String, required:true},
    publish_date: {type: String, required:true},
    expiry_date: {type: String, required:true}
});

module.exports = mongoose.model('Flyer', flyerSchema);