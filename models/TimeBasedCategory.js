const mongoose = require('mongoose');

const timeBasedCategorySchema = mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
})

const TimeBasedCategory = mongoose.model('TimeBasedCategory', timeBasedCategorySchema);
module.exports = TimeBasedCategory;