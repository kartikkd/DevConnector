const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //GET token from header
  const token = req.header('x-auth-token');

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token,authorizatoin denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwttoken'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
