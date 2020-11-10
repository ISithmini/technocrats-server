const jwt = require('jsonwebtoken');
const Role = require('../models/Role');

const maxAge = 60*60*24;
const secret = 'TechnoJob20!20';

const createJwt = ( id, name, role ) => {// creates the jwt token
  return jwt.sign({ id, name, role }, secret, {
    expiresIn: maxAge
  })
}

const getJwtInfo = (req) => {// fetch the payload data of jwt
  const token = req.cookies.regdata
  let data;
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return null
    } else {
      data = decodedToken;
    }
  })
  return data;
}

const basicAuth = (req, res, next) => {//middleware to check login status
  const token = req.cookies.regdata;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized access' })
      } else {
        next();
      }
    })
  } else {
    res.status(401).json({ error: 'Unauthorized access' })
  }
}

const checkPermission = (code) => {// check logged user have given permission of resource 

  return (req, res, next) => {
    
    const token = req.cookies.regdata;
    let flag = false;
    
    if (token) {

      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ error: 'Unauthorized access' })
        } else {
          const role = Role.findOne({ title: decodedToken.role.title })
            .then(resultRole => {
              if (resultRole.permissions.length ) {
                resultRole.permissions.forEach(permission => {
                  if ( permission === code ) {
                    flag = true;
                    next();
                  }
                }); 
                if (!flag)
                  res.status(401).json({ error: 'Unauthorized access' });
              } else {
                res.status(401).json({ error: 'Unauthorized access' });
              }
            });
          }
        })

       } else {
        res.status(401).json({ error: 'Unauthorized access' })
      }
    
  }

}

module.exports = {
  createJwt,
  getJwtInfo,
  basicAuth,
  checkPermission
}