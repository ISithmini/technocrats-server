const { findOne } = require("../../models/TimeBasedCategory");
const TimeBasedCategory = require("../../models/TimeBasedCategory")

const getTimeCategories = async (req, res) => {
  try {
    const timeCategories = await TimeBasedCategory.find();
    res.status(200).json({ timeCategories });
  } catch (err) {
    console.log(err);
  }
}

const addTimeCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const timeCategory = await TimeBasedCategory.create({ name, description });
    res.status(201).json({ timeCategory })
  } catch (err) {
    console.log(err);
  }
}

const editTimeCategory = async (req, res) => {
  try {
    const { _id, name, description } = req.body;
    const updatedTimeCategory = await TimeBasedCategory.updateOne(
      { _id: _id },
      { $set: { name: name, description: description } }
    );
    res.status(200).json({ updatedTimeCategory }) 
  } catch (err) {
    console.log(err);
  }
}

const deleteTimeCategory = async (req, res) => {
  try {
    const deletedTimeCategory = await TimeBasedCategory.findOne({ _id: req.query._id });
    deletedTimeCategory.remove();
    res.status(200).json({ deletedTimeCategory });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getTimeCategories, 
  addTimeCategory,
  editTimeCategory,
  deleteTimeCategory
}