const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  resource: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;