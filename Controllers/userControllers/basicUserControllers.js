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
   }).then((result) => {
    const token = createJwt( result._id, result.name, result.role );
    res.cookie('regdata', token, { httpOnly: true, maxAge: 60*60*24*1000 });
    res.status(201).json({ result, token })
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
    const token = createJwt( user._id, user.name, user.role );
    res.cookie('regdata', token, { httpOnly: true, maxAge: 60*60*24*1000 })
  } catch(err) {
    const errors = errorHandler(err);
    res.status(401).json({ errors });
  }
}

module.exports = {
  createAccount,
  loginAccount
}