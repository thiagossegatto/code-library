const jwt = require('jsonwebtoken');
const authConfig = require('../../config/config.json');

module.exports = (req, res, next) => {
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

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err)
      return res.status(401).send({ error: 'Token inavlid' });
      
    req.userId = decoded.id;
    return next();

  })

};