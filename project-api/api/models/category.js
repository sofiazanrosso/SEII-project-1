const mongoose= require('mongoose');

// general schema for a category
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true}

});

module.exports = mongoose.model('Category',categorySchema);