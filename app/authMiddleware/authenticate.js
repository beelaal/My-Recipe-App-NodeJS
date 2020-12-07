var jwt = require('jsonwebtoken');
var moment = require('moment');
const config = require('./../../config/configJs');

let authenticate = (req, res, next) => {
    var excludeUrl = ['/parent-settings', '/samlAuth'];
    if (excludeUrl.includes(req.url)) { 
      next();
    } else {
      let token = req.headers['authorization'];
      const session = req.session
  
      if (!token){
        res.clearCookie('user_sid');
      return res.status(500).json({
        auth: false,
        // msg: 'No token provided.'
        status: false,
        code: 440,
        type: 'error' ,
        title: 'Session Time Out token',
        message:'Please Login Again',
        data:null,
      });
    }

      jwt.verify(token, config.api.apiSecretKey, (err, decoded) => {
        if (err) return res.status(500).json({
          auth: false,
          msg: 'Failed to authenticate the provided token.'
        });
  
        req.user = decoded.user;
        let usersModel = req.getInstance('users');
        usersModel.findOne({
          where: { email: req.user.email, is_active: 1, status: true },
        })
          .then((user) => {
            if (!user) {
              req.session.destroy();
              res.clearCookie('user_sid');
            }
            req.user = user;
          })
          .catch(err => {
            res.status(500).json({
              auth: false,
              msg: 'Internal Server Error'
            });
          });
  
        next();
      });
    }
}
module.exports = {
    authenticate
}


