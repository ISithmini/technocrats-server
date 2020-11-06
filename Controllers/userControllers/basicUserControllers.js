const User = require('../../models/User');
const { createJwt } = require('../../services/Authentication');
const errorHandler = require('../../services/Error/UserErrorHandler');

const createAccount = (req, res) => {
  const { 
    name, 
    email, 
    password, 
    location, //String
    contactNo, //String
    bio, 
    skills //{category: String, description: String}
  } = req.body;

  const user = User.create({ 
    name, 
    email, 
    password, 
    location,
    contactNo,
    bio,
    skills 
   }).then((result) => {
    const token = createJwt( result._id, result.name, result.role );
    res.cookie('regdata', token, { httpOnly: true, maxAge: 60*60*24*1000 });
    res.status(201).json({ result, token })
   })
   .catch((err) => {
     const errors = errorHandler(err)
   })
}

module.exports = {
  createAccount,
}