const mongoose = require('mongoose');
const User = require('./User');

const roleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  permissions: {
    type: [String],
    ref: 'Permission'
  }
})

roleSchema.pre('remove', async function (next) {
  try {
    const users = await User.updateMany(
      { role: this.title },
      { $set: { role: "Basic" } }
    )
    //console.log('trigger working');
    next();
  } catch (error) {
    console.log('No users with the deleted role'); 
  }
})

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;