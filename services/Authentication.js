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

const checkPermission = (resource, permission) => {// check logged user have given permission of resource 

  return (req, res, next) => {
    
    const token = req.cookies.regdata;
    let flag = true;
    
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ error: 'Unauthorized access' })
        } else {
          
          const roles = Role.findOne({ title: decodedToken.role })
          .then(roles => {
            const resources = roles.privileges
            .filter(obj => obj.resource === resource)
            const data = resources[0].permissions;
              
            if(data.length && resources.length) {
              data.forEach(element => {
                if (element === permission) {
                  next();
                  flag = false;
                }
              });
             if( flag )
              res.status(401).json({ error: 'Unauthorized access' })
            } else {
              res.status(401).json({ error: 'Unauthorized access' })
            }
            }).catch(err => res.status(401).json({ error: 'Unauthorized access' }))

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