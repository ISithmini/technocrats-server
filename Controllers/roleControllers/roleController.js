const Role = require('../../models/Role');
const { getJwtInfo } = require('../../services/Authentication');
const roleErrorHandler = require('../../services/Error/roleErrorHandler');

//////////////////////////////////// GET A ROLE ////////////////////////////////////////////

const getRole = async (req, res) => {
  try {
    const { role } = getJwtInfo(req);
    console.log(role);
    const selectedRole = await Role.findOne({ title: role });
    res.status(400).json(selectedRole);
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
  removePermissionFromRole,
  addPermissionToRole,
  //createAdmin
}



