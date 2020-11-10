const express = require('express');
const roleControllers = require('../../Controllers/roleControllers/roleController');
const { basicAuth, checkPermission } = require('../../services/Authentication');
const router = express.Router();


router.get('/getroles', basicAuth,() => {})//get all roles /////////////////////////////

router.get('/getarole/:rolename', roleControllers.getRole)// get a role //////////////////////

router.post('/add_role', checkPermission('P0101'), roleControllers.createRole)// add a role /////////////////////

router.patch('/add_permission_to_role', checkPermission('P0102'), roleControllers.addPermissionToRole)// add a permission to a role //////////////////

router.patch('/remove_permission_from_role', roleControllers.removePermissionFromRole)// remove a permission from role///

module.exports = router;