const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desctription: {
    type: String,
  },
  images: {
    type: [String]
  },
  contactNo: {
    type: Number
  },
}, {timestamps: true});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
module.exports = Advertisement;