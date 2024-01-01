const passport=require("../config/passport");

const isVerifiedUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    else if(!user.verified){
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  })(req, res, next);
  };
  

  module.exports = isVerifiedUser ;