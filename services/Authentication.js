const jwt = require('jsonwebtoken');

const maxAge = 60*60*24;
const secret = 'TechnoJob20!20';

const createJwt = ( id, name, role ) => {
  return jwt.sign({ id, name, role }, secret, {
    expiresIn: maxAge
  })
}

const getJwtInfo = (req) => {
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

module.exports = {
  createJwt,
  getJwtInfo
}