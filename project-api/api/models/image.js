// // // // // //
// TEMPORANEO  //
// // // // // //

const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    img: Buffer,
    mimeType: String
});

module.exports = mongoose.model('Image', imageSchema);