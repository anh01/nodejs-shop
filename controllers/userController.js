
module.exports = function(passport) {
  var redirects = {success: '/', failure: '/login'};
  var self = this;
  self.passport = passport;
  self.model = require('../model/user');
  
  self.authenticate = function(req, res, next) {
    self.passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        req.session.messages =  [info.message];
        res.locals.messages = req.session.messages;
        return res.redirect(redirects.failure);
      }
      req.session.user = user;
      req.login(user, function(err) {
        if (err) { 
          return next(err); 
        }
        console.log('logged in', user);
        return res.redirect(redirects.success);
      });
    })(req, res, next);
  };
  self.logout = function(req, res, next){
    req.logout();
    res.redirect(redirects.success);
  };
  self.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
  self.getCurrentUser = function(req, res, done) {
    if(req.user) { 
      console.log("Using User", req.user);
      res.locals.user = req.user;
    } else {
      res.locals.user = null;
    }
    done();
  };
  // self.ensureRole = function(roleName) {
  //   var ensureRole = this;
  //   ensureRole.roleName = roleName;
  //   function(req, res, next) {
  //     // if(req.session.user && req.session.user.roles.) {
  //       return next();
  //     // }
  //     // res.redirect('/login');
  //   }
  // };
  
  return self;
};
