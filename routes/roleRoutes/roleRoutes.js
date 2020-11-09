const express = require('express');
const roleControllers = require('../../Controllers/roleControllers/roleController');
const { basicAuth } = require('../../services/Authentication');
const router = express.Router();


router.get('/getroles', basicAuth,() => {})//get all roles /////////////////////////////

router.get('/getarole/:rolename', roleControllers.getRole)// get a role //////////////////////

router.post('/add_role', roleControllers.createRole)// add a role /////////////////////

router.patch('/add_resource_to_role', roleControllers.addResourceToRole)// add a resource to role /////////////////

router.patch('/remove_resource_from_role', roleControllers.removeResourceFromRole)// remove a resource from role //////

router.patch('/add_permission_to_role', roleControllers.addPermissionToRole)// add a permission to a role //////////////////

router.patch('/remove_permission_from_role', roleControllers.removePermissinFromRole)// remove a permission from role///

module.exports = router;