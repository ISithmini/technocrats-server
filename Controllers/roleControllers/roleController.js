const Role = require('../../models/Role');
const { getJwtInfo } = require('../../services/Authentication');
const roleErrorHandler = require('../../services/Error/roleErrorHandler');

//////////////////////////////////// GET A ROLE ////////////////////////////////////////////

const getRole = async (req, res) => {
  try {
    const { role } = getJwtInfo(req);
    console.log(role);
    const role = await Role.findOne({ title: role});
    res.status(400).json(role);
  } catch (error) {
    res.status(400).json({ errors: { message: "something went wrong" }});
  }

}

//////////////////////////////////// CREATE ROLE ///////////////////////////////////////////

const createRole = (req, res) => {

  const { role } = req.body

  const sampleRole = {
    title: role,
    privileges: []
  }

  const createdRole = Role.create(sampleRole)
  .then(result => {
    res.status(201).json(createdRole);
  }).catch(err => {
    errors = roleErrorHandler(err);
    res.status(400).json({ errors })
  })
}

/////////////////////////////////// ADD A RESOURCE /////////////////////////////////////////

const addResourceToRole = async (req, res) => {

  const { role, resource } = req.body;

  const sampleResource = {
    resource: resource,
    permissions: []
  }

  try {
    const editedRole = await Role.updateOne(
      { title: role },
      { $addToSet: {
        privileges: sampleResource
      } }
    )
    res.status(204).json(editedRole);
  } catch (error) {
    console.log(error);
  }

}

////////////////////////////////// REMOVE A RESOURCE ////////////////////////////////////////

const removeResourceFromRole = async (req, res) => {
  const { role, resource } = req.body;

  try {
    const editedRole = await Role.updateOne(
      { title: role },
      { $pull: {
        privileges: { resource: resource }
      } }
    )
    res.status(204).json(editedRole);
  } catch (error) {
    console.log(error);
  }
}


////////////////////////////////// ADD A PERMISSION /////////////////////////////////////////

const addPermissionToRole = async (req, res) => {
  try {
    const { role, resource, permission } = req.body;
    const updatedRoles = await Role.updateOne(
      { title: role, "privileges.resource": resource },
      { $addToSet: { 
        "privileges.$.permissions": permission
      } },
    );
    res.status(204).json(updatedRoles);
  } catch (error) {
    console.log(error);
  }
}


/////////////////////////////////// REMOVE A PERMISSION ////////////////////////////////////

const removePermissinFromRole = async (req, res) => {
  try {
    const { role, resource, permission } = req.body;
    let updatedRoles = await Role.updateOne(
      { title: role, "privileges.resource": resource },
      { $pull : {
        "privileges.$.permissions": permission
      } }
    );
    res.status(204).json(updatedRoles);
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: {message: 'Somethig went wrong!'} })
  }
}

// const createAdmin =  async () => {
//   const created = await Role.create(sampleRole);
// }

// const sampleRole = {
//   title: 'Admin',
//   privileges: [

//     {
//       resource:'user',
//       permissions: [
//         'deleteUsers',
//         'editSelectedUser',
//         'changeDissable:UserStatus',
//         'verifyUser'
//       ],
//     },

//     {
//       resource:'job',
//       permissions: [
//         'editAnyJob',
//         'approveJob',
//       ],
//     },

//     {
//       resource:'report',
//       permissions: [
//         'showAllReports',
//         'changeReportResolveStatus'
//       ],
//     },

//     {
//       resource:'role',
//       permissions: [
//         'createRole',
//         'editRole'
//       ],
//     },

//   ]
// }


module.exports = {
  getRole,
  createRole,
  addResourceToRole,
  removeResourceFromRole,
  addPermissionToRole,
  removePermissinFromRole,
  //createAdmin
}



