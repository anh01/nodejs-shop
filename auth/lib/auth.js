
var checkPermission = function() {
    var defaultAllowed = ['/cart','/product','/login','/logout'];
    var self = this;
    var ensurePermissions = self;
    self.defaultAllowed = defaultAllowed;
    
    self.check = function(req, res, done) {
      var path = req.path;
      //console.log('path', path, typeof path);
      if(path === '/') return done(); //special case
      //check default allowed
      for(var i in self.defaultAllowed) {
        if(path.indexOf(self.defaultAllowed[i])===0) {
          return done();
        }
      }
      // //check special permissions
      if(req.user && req.user.roles) {
        var roles = req.user.roles;
        for(var j in roles) {
          if(path.indexOf(roles[j].action)===0) { //TODO work on making more specific first - sort roles by length?
            return done();
          }
        }
      }
      res.status(500, 'Not Authorised:' + req.path);//TODO make this better
      // return done();
      res.redirect('/login');
    };
    return ensurePermissions;
  };

module.exports = function(User, Passport, Strategy) {
  var self = this;
  self.passport = Passport;
  self.Strategy = Strategy;
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
  self.ensureHasPermission = checkPermission;
  return self;
  
};