const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;