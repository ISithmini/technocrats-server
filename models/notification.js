const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String
  }
}, {timestamps: true})

const Notification = new mongoose.model('Notification', notificationSchema);
module.exports = Notification;