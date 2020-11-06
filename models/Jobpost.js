const mongoose = require('mongoose');
const User = require('./User');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  text: String
}, {timestamps:true});

const jobSchema = new mongoose.Schema({
  providerId: { // add value using code
    type: mongoose.Types.ObjectId, 
    ref: 'User',
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  approvedStatus: {
    type: Boolean
  },
  approvedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  status: { // completed New Accepted 
    type: String 
  },
  activeStatus: { //Active cancelled
    type: Boolean
  },
  budget: {
    type: Number
  },
  location: {
    type: String
  },
  appliedCount: {
    type: Number,
    default: 0
  },
  comments: {
    type: [commentSchema]
  }

}, {timestamps: true});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;