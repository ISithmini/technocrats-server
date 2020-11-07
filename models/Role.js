const mongoose = require('mongoose');

const privilegeSchema = mongoose.Schema({
  resource: {
    type: String,
  },
  permissions: [String]
})

const roleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  privileges: [privilegeSchema]
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;