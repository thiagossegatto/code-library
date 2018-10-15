const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}){
  return jwt.sign(params, config.secret, { 
    expiresIn: '1d' 
  });
}
 
router.post('/register', async (req, res) => {
  try {

    const { email } = req.body;

    if(await User.findOne({email}))
      return res.status(400).send({ error: 'User already exists' });

    const user = await User.create(req.body);
    user.password = undefined;
    return res.send({
      user,
      token : generateToken({ id:user.id })
    });

  } catch (err) {
    return res
      .status(400)
      .send({error: 'Registration failed'});
  }
});

router.post('/authenticate', async(req, res) => {
  const { email, password } = req.body;
  const dados = await User.findOne({ email }).select('+password');

  if(!dados)
    return res.status(400).send({ error: 'User not found' });
  
  if(!await bcrypt.compare(password, dados.password))
    return res.status(400).send({ error: 'Invalid Password' });
  
    dados.password = undefined;

  var user = {
    email: dados.email,
    name: dados.name,
    token : generateToken({ id:dados.id })
  }

  res.send({ 
    user
  });

});

router.get('/validate', async(req, res) => {

  const autoHeader = req.headers.authorization;

  if(!autoHeader)
    return res.status(401).send({ error: 'No token provided' });

  const parts = autoHeader.split(' ');

  if(!parts.lenth === 2)
    return res.status(401).send({ error: 'Token error' });
  
  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme)){
    return res.status(401).send({ error: 'Token malformatted' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
      return res.status(200).send({ valid: !err });
  })

});

module.exports = app => app.use('/auth', router);