const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Types.ObjectId, // add by code
    ref: 'User'
  },
  reportedFor: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  reportedPost: {
    type: mongoose.Types.ObjectId,
    ref: 'Job'
  },
  type: {
    type: String,
  },
  status: {
    type: Boolean //solved or not
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;