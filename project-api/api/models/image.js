// // // // // //
//  ELIMINAMI  //
// // // // // //

const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    mimeType: String,
    buffer: Buffer
});

module.exports = mongoose.model('Image', imageSchema);