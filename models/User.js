const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  proPic: {
    type: String,
  },
  location: {
    type: String,
    required: true
  },
  contactNo: {
    type: Number,
    required: true
  },
  activeStatus: {
    type: Date
  },


}, {timestamps: true})
