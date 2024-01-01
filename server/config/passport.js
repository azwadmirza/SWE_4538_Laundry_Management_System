const passport = require('passport');
const Customer = require('../models/customer.model');
const Manager = require('../models/manager.model');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

passport.use(new JwtStrategy({
  secretOrKey: process.env._JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
  const customer = await Customer.findById(payload.sub);
  const manager = await Manager.findById(payload.sub);
  if (customer) {
    done(null, { id: customer._id, verified: customer.verified, role: 'customer' });
  } 
  else if (manager) {
    done(null, { id: manager._id, verified: manager.verified, role: 'manager' });
  } 
  else {
    done(null, false);
  }
}));


passport.serializeUser((user, done) => {
  done(null, `${user.id}_${user.verified}_${user.userType}`);
});


passport.deserializeUser(async (serializedUser, done) => {
  const [id, verified, userType] = serializedUser.split('_');
  const user = userType === 'customer'
    ? await Customer.findById(id)
    : await Manager.findById(id);

  if (user) {
    done(null, { id: user._id, verified: user.verified, role:userType });
  } else {
    done(null, false);
  }
});

module.exports = passport;


