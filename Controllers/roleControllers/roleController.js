const Role = require('../../models/Role');

const createRole = () => {
  const role = Role.create(sampleRole)
  .then(result => {
    console.log('role created');
  })
}

module.exports = {
  createRole,
}

// const sampleRole = {
//   title: 'Admin',
//   privileges: [

//     {
//       resource:'user',
//       permissions: [
//         'deleteUser',
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
