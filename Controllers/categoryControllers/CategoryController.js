const Category = require("../../models/Category");
const SubCategory = require("../../models/SubCategory");

/////////////////////////////////////////////// ADD CATEGORIES ////////////////////////////////////////////////////

const addCategory = async (req, res) => {
  try {
    const newCategory = await Category.create({ title: req.body.title });
    res.status(200).json({ newCategory });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error });
  }
}


/////////////////////////////////////////////// GET CATEGORIES ///////////////////////////////////////////////////

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories })
  } catch (err) {
    console.log(err);
    res.status(400).json({ error });
  }
}


/////////////////////////////////////////////// DELETE A CATEGORY ///////////////////////////////////////////////

const deleteCategory =  async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.query._id });
    category.remove();
    console.log(category);
    res.status(200).json({ category });
  } catch (err) {
    console.log(err);
  }
}


////////////////////////////////////////////// ADD A SUBCATEGORY ///////////////////////////////////////////////

const addSubCategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;
    const subCategory = await SubCategory.create({ category: categoryId, name: name });
    res.status(201).json({ subCategory });
  } catch (err) {
    console.log(err); 
  }
}


///////////////////////////////////////////// GET SUBCATEGORIES ///////////////////////////////////////////////

const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({ subCategories });
  } catch (err) {
    console.log(err);
  }
}

///////////////////////////////////////////// DELETE SUBCATEGORIES ////////////////////////////////////////////

const deleteSubCategory = async (req, res) => {
  try {
    const deletedSubCategory = await SubCategory.findOne({ _id: req.query._id });
    deletedSubCategory.remove();
    res.status(200).json({ deletedSubCategory });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
  addSubCategory,
  getSubCategories,
  deleteSubCategory
}