const mongoose = require('mongoose');
const SubCategory = require('./SubCategory');

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
})

categorySchema.pre('remove', async function (next) {
  const subcategories = await SubCategory.find({ category: this._id });
  subcategories.forEach(subCategory => {
    subCategory.remove();
  })
  next();
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;