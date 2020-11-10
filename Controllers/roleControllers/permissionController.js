const Permission = require("../../models/Permission");

const getPermissions = async (req, res) => { 
  try {
    const permissions = await Permission.find();
    res.status(200).json({ permissions });
  } catch (err) {
    console.log(err);
  }
}

///////////////////////////////// CREATE NEW PERMISSION /////////////////////////////////////////////

const createPermission = async (req, res) => {
  try {
    const { code, resource, description } = req.body;
    const newPermission = await Permission.create({ code, resource, description });
    res.status(201).json({ newPermission });
  } catch(err) {
    console.log(err);
  }
}

//////////////////////////////// DELETE PERMISSION /////////////////////////////////////////////////

const deletePermission = async (req, res) => {
  const { code } = req.body;
 try {
    const deletedPermission = await Permission.findOneAndDelete({ code: code });
    res.status(200).json({ deletedPermission });
 } catch(err) {
    console.log(err);
 }
}

//////////////////////////////// EDIT PERMISSION //////////////////////////////////////////////////

const editPermission = async (req, res) => {
  try {
      const { code, resource, description } = req.body;
      const editedPermission = await Permission.updateOne(
        { code: code },
        { $set: { 
          resource: resource,
          description: description
        } }, { runValidators: true }
      )
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getPermissions,
  createPermission,
  editPermission,
  deletePermission
}