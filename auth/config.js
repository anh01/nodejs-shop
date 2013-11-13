
module.exports = function() {
  var User = require('../model/user').model.user;
  var self = this;
  self.passport = require('passport');
  self.Strategy = require('passport-local').Strategy;
  self.User = User;

  self.init = function(app) {
    
    self.passport.use(new self.Strategy({usernameField: 'email', passwordField: 'pwd', model: User}, function(email, password, done) {
      self.User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Unknown user ' + email });
        }

        user.checkPassword(password, function(err, isMatch) {
          if (err) {
            return done(err);
          }
          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid password' });
          }
        });
      });
    }));
    self.passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    self.passport.deserializeUser(function(id, done) {
      self.User.findByIdAndPopulate(id, function (err, user) {
        done(err, user);
      });
    });
    app.use(self.passport.initialize());
    app.use(self.passport.session());
  };
  return self;
  
};