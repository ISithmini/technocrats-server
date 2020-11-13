const express = require('express');
const router = express.Router();
const adminUserControllers = require('../../Controllers/userControllers/adminUserControllers');
const { checkPermission } = require('../../services/Authentication');

router.get('/find_user', adminUserControllers.findAUser); /// find a user for dashboard with email or contact number

router.patch('/editByAdmin',/* permissionChecked at controller*/adminUserControllers.editUser);

router.delete('/deleteByAdmin', checkPermission('P0202'), adminUserControllers.deleteUser);

module.exports = router;
