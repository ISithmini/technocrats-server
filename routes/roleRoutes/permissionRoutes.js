const express = require('express');
const { basicAuth, checkPermission } = require('../../services/Authentication');
const router = express.Router();
const permissionControllers = require('../../Controllers/roleControllers/permissionController');

router.get('/all_permissions', checkPermission('P0103'), permissionControllers.getAllPermissions);

router.get('/get_permissions_of_role/:role', ()=>{});

router.post('/create_permission', permissionControllers.createPermission); // create new permission

router.patch('/edit_permission', permissionControllers.editPermission); // edit a permission

router.delete('/delete/:code', permissionControllers.deletePermission); // delete a permission


module.exports = router;  