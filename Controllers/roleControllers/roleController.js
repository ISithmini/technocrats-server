const Role = require('../../models/Role');
const { getJwtInfo } = require('../../services/Authentication');
const roleErrorHandler = require('../../services/Error/roleErrorHandler');

//////////////////////////////////// GET ALL ROLES /////////////////////////////////////////

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ roles });
  } catch (err) {
    console.log(err);
  }
}


//////////////////////////////////// GET A ROLE ////////////////////////////////////////////

const getRole = async (req, res) => {
  try {
    const { role } = getJwtInfo(req);
    console.log(role);
    const selectedRole = await Role.findOne({ title: role });
    res.status(200).json(selectedRole);
  } catch (error) {
    res.status(400).json({ errors: { message: "something went wrong" }});
  }

}

//////////////////////////////////// CREATE ROLE ///////////////////////////////////////////

const createRole = (req, res) => {

  const { role } = req.body

  const sampleRole = {
    title: role,
    permissions: []
  }

  const createdRole = Role.create(sampleRole)
  .then(result => {
    res.status(201).json(result);
  }).catch(err => {
    errors = roleErrorHandler(err);
    res.status(400).json({ errors })
  })
}

/////////////////////////////////// DELETE ROLE //////////////////////////////////////////////

const deleteRole = async (req, res) => {
  const { role } = req.params;
  try {
    if( role === 'Admin' && role === 'Basic' && role === 'Moderator' )
      throw Error('This role cannot be deleted!')
    const deletedRole = await Role.findOne({ title: role });
    deletedRole.remove();
    res.status(200).json({ deletedRole });
  } catch(err) {
    res.status(404).json({ error: "Role not found", err: err.message })
  }

}

/////////////////////////////////// ADD A PERMISSION /////////////////////////////////////////

const addPermissionToRole = async (req, res) => {

  const { role, code } = req.body;

  try {
    const editedRole = await Role.updateOne(
      { title: role },
      { $addToSet: {
        permissions: code
      } }
    )
    res.status(204).json(editedRole);
  } catch (error) {
    console.log(error);
  }

}

////////////////////////////////// REMOVE A PERMISSION ////////////////////////////////////////

const removePermissionFromRole = async (req, res) => {
  const { role, code } = req.body;
  
    if ( role !== 'Admin' ) {
      try {
        const editedRole = await Role.updateOne(
          { title: role },
          { $pull: {
            permissions: code
          } }
        )
        res.status(204).json(editedRole);
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(401).json({ error: "Unauthorized access!" })
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
  getAllRoles,
  getRole,
  createRole,
  removePermissionFromRole,
  addPermissionToRole,
  deleteRole
  //createAdmin
}



