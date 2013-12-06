var authLib = require('./lib/auth.js')
//Injects dependencies into the lib/auth export.
module.exports = function() {
  var self = this;
  var User = require('../model/user').model.user;
  var Passport = require('passport');
  var Strategy = require('passport-local').Strategy;
  self.authLib = authLib(User, Passport, Strategy);

  self.init = self.authLib.init;
  self.ensureHasPermission = self.authLib.ensureHasPermission;

  return self;
  
};