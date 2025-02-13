const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const Users = require('./auth-model.js');



router.post('/register', (req, res) => {
  let user = req.body;

 if(!user.username || !user.password){
   res.status(400).json({message:"Must provide username and password"})
 }

  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;
  

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      
       
      res.status(500).json(error);
    });
  
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        
        const token = getJwtToken(user.username); 

        
        res.status(200).json({
          message: `Welcome ${user.username}!`, 
          token 
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({message: "Could not add user"});
    });
});


function getJwtToken(username) {
  const payload = {
    username,
   
  }

  const secret = process.env.JWT_SECRET || 'safe';

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret, options)
}

module.exports = router;
