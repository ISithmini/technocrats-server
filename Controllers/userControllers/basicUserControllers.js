const Role = require('../../models/Role');
const User = require('../../models/User');
const { createJwt } = require('../../services/Authentication');
const errorHandler = require('../../services/Error/UserErrorHandler');


//////////////////////////////////////////// CREATE ACCOUNT /////////////////////////////////////////////////////

const createAccount = (req, res) => {
  const { 
    name, 
    email, 
    password, 
    location, //String
    contactNo, //String
  } = req.body;

  const user = User.create({ 
    name, 
    email, 
    password, 
    location,
    contactNo, 
   }).then( async (result) => {
    const role = await Role.findOne({ title: result.role })
    const token = createJwt( result._id, result.name, role );
    res.cookie('regdata', token, { maxAge: 60*60*24*1000 });
    res.status(201).json({ token })
   })
   .catch((err) => {
     const errors = errorHandler(err);
     res.status(400).json({ errors });
   })
}

//////////////////////////////////////// LOGIN ACCOUNT //////////////////////////////////////////////////////////

const loginAccount = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const role = await Role.findOne({ title: user.role })
    const token = createJwt( user._id, user.name, role );
    res.cookie('regdata', token, { maxAge: 60*60*24*1000 });
    res.status(200).json({ token });
  } catch(err) {
    const errors = errorHandler(err);
    res.status(401).json({ errors });
  }
}

//////////////////////////////////////// LOGOUT //////////////////////////////////////////////////////////////////
const logoutAccount = async (req, res) => {
  await res.cookie('regdata', '', {maxAge: 1}); 
  res.status(200).json({  });
  console.log("logged out");
}

const getUserBasicDetails = async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.query._id});
        res.status(200).json({user});
    } catch (error){
        console.log(error);
    }  
}

const getSavedPosts = async (req, res) => {
    try{
        console.log(req.query);
        const user = await User.findOne({ _id: req.query._id});
        res.status(200).json({user});
    } catch (error){
        console.log(error);
    }
}

const editProfile = async (req, res) => {
    const {
        name,
        email,
        location,
        contactNo,
    } = req.body
    
    try {
        const editedUser = await User.editProfile({
            name,
            email,
            location,
            contactNo,
        });

        res.status(200).json({ editedUser });
    } catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
}


module.exports = {
  createAccount,
  editProfile,
  loginAccount,
  logoutAccount,
  getUserBasicDetails,
  getSavedPosts
}