const router = require('express').Router();
const timeCategoryControllers = require('../../Controllers/categoryControllers/TimeBaseCategoryController');
const { checkPermission } = require('../../services/Authentication');

router.get('/get_all_timecategories', timeCategoryControllers.getTimeCategories);

router.post('/add_a_timecategory', checkPermission('P0301'), timeCategoryControllers.addTimeCategory);

router.delete('/delete_a_timecategory', checkPermission('P0301'), timeCategoryControllers.deleteTimeCategory);

router.patch('/edit_a_timecategory', checkPermission('P0301'), timeCategoryControllers.editTimeCategory);


module.exports = router;