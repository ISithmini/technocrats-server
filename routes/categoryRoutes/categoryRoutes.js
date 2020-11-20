const router = require('express').Router();
const categoryControllers = require('../../Controllers/categoryControllers/CategoryController');
const { checkPermission } = require('../../services/Authentication');

router.get('/get_all_categories', categoryControllers.getCategories);

router.post('/add_a_category', checkPermission('P0301'), categoryControllers.addCategory);

router.delete('/delete_a_category', checkPermission('P0301'), categoryControllers.deleteCategory);



router.get('/get_all_sub_categories', categoryControllers.getSubCategories);

router.post('/add_a_sub_category', checkPermission('P0301'), categoryControllers.addSubCategory);

router.delete('/delete_a_sub_category', checkPermission('P0301'), categoryControllers.deleteSubCategory);


module.exports = router;