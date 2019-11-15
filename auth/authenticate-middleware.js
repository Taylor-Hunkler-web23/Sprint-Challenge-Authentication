/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };

const jwt = require('jsonwebtoken'); //1 npm i jsonwebtoken

const Users = require('../auth/auth-model.js');

module.exports = (req, res, next) => {
const token = req.headers.authorization; //2 Put token on header

  if (token) {
    const secret = process.env.JWT_SECRET || 'safe';

    //3 check that token is valid
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err){
     
        res.status(401).json({ message: 'Invalid Credentials' });
      }else {
        req.decodedJwt = decodedToken;
       
        next();
      }
    })

 
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
