const { Mongoose } = require("mongoose");
const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
  }
});