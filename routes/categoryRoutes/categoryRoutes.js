const CategoryController = require('../../Controllers/categoryControllers/CategoryController');
const { getCategories } = require('../../Controllers/categoryControllers/CategoryController');

const router = require('express').Router();
const categoryControllers = require('../../Controllers/categoryControllers/CategoryController');

router.get('/get_all_categories', categoryControllers.getCategories);

router.post('/add_a_category', categoryControllers.addCategory);

router.delete('/delete_a_category', categoryControllers.deleteCategory);



router.get('/get_all_sub_categories', categoryControllers.getSubCategories);

router.post('/add_a_sub_category', categoryControllers.addSubCategory);

router.delete('/delete_a_sub_category', categoryControllers.deleteSubCategory);


module.exports = router;