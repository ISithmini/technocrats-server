const express = require('express');
const { basicAuth } = require('../../services/Authentication');
const router = express.Router();
const permissionControllers = require('../../Controllers/roleControllers/permissionController');

router.get('/all_permissions', permissionControllers.getPermissions);

router.post('/create_permission', permissionControllers.createPermission); // create new permission

router.patch('/edit_permission', permissionControllers.editPermission); // edit a permission

router.delete('/delete/:code', permissionControllers.editPermission); // delete a permission


module.exports = router;  