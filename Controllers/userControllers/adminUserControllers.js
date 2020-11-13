const User = require('../../models/User');
const { checkAccess } = require('../../services/Authentication');

/////////////////////////////////////// FIND USER TO DASHBOARD TO EDIT ///////////////////////////////////

const findAUser = async (req, res) => {
  let foundUser = {}
  try {
    if(req.query.email){
      foundUser = await User.findOne({ email: req.query.email });
    } else {
      foundUser = await User.findOne({ contactNo: req.query.contactNo });
    }

    if (foundUser.email) {
      const { _id, name, email, contactNo, role, isDissable, verifyStatus } = foundUser;
      res.status(200).json({ _id, name, email, contactNo, role, isDissable, verifyStatus });
    } else {
      const { _id, name, contactNo, role, isDissable, verifyStatus } = foundUser;
      res.status(200).json({ _id, name, email: '', contactNo, role, isDissable, verifyStatus });
    }
    
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: 'No user Found!' });
  }
}

////////////////////////////////////// EDIT USER IN THE DASHBOARD ///////////////////////////////////////////////

const editUser = async (req, res) => {
  try {
    let editedUser;
    const { _id ,role, verifyStatus, isDissable } = req.body;
    if (checkAccess('P0105') && checkAccess('P0201')) {
      console.log('here');
      editedUser = await User.updateOne(
        { _id: _id },
        { $set: { 
          role: role,
          verifyStatus: verifyStatus,
          isDissable: isDissable
        } }
      )
    } else if (checkAccess('P0105')) {
      editedUser = await User.updateOne(
        { _id: _id },
        { $set: { 
          role: role,
        } }
      )
    } else if (checkAccess('P0201')) {
      editedUser = await User.updateOne(
        { _id: _id },
        { $set: { 
          verifyStatus: verifyStatus,
          isDissable: isDissable
        } }
      )
    } else {
      res.status(401).json({ error: 'Unauthorized access' });
    }

    res.status(204).json( editedUser );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Somthing went wrong' })
  }

}

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.query._id });
    res.status(200).json({ deletedUser })
  } catch (err) {
    res.status(500).json({ error: 'Somthing went wrong!' })
  }
}

module.exports = {
  findAUser,
  editUser,
  deleteUser
}