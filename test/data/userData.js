var async = require('async'); //for parallel creation of products, categories, etc.

var user = require('../../model/user');
var UserModel = user.model.user;
var RoleModel = user.model.role;

var dataTools = require('./dataTools');
var create = dataTools.create;
var createRelationship = dataTools.createRelationship;
var clean = dataTools.clean;
var dbcallback = dataTools.dbcallback; //default callback handler

var userRoles = [
  {name: 'Administrator'},
  {name: 'Editor'},
  {name: 'Warehouse Manager'}
];

var users = [ // n.b., non-email address logins will fail when we put validation on the front end!
  {email: 'andy', password:'bob'},
  {email: 'edward', password:'bob'},
  {email: 'william', password:'bob'}
];


var createUsers = function(callback) {
  this.create = create;
  this.create(UserModel, users, callback);
};
var createRoles = function(callback) {
  this.create = create;
  this.create(RoleModel, userRoles, callback);
};

var createParent = function(data, callback) {
  data.property = 'roles';
  data.childtype = RoleModel;
  data.parenttype = UserModel;
  data.type = undefined;
  createRelationship(data, callback);
};

var cleanFunctions = [
    function(dbcallback) {clean(UserModel, dbcallback);},
    function(dbcallback) {clean(RoleModel, dbcallback);}
    ];
var createFunctions = 
  [
    function(dbcallback) {createRoles(dbcallback);},
    function(dbcallback) {createUsers(dbcallback);}
  ];
  
var createUserRoleRelationships = [
  function(dbcallback) {createParent({subject: users[0], object: userRoles[0]}, dbcallback)},
  function(dbcallback) {createParent({subject: users[1], object: userRoles[1]}, dbcallback)},
  function(dbcallback) {createParent({subject: users[2], object: userRoles[2]}, dbcallback)}
  ];

var conn = dataTools.setupConnection();

conn.on('open', function() {
  //TODO:
  //clean
  //then
  //create
  //then
  //relate
  
  async.parallel(cleanFunctions, function(err, results){ //cleanup
    dataTools.dbcallback(err);
    async.parallel(createFunctions, function(err, results) { //create
      dataTools.dbcallback(err);
      async.parallel(createUserRoleRelationships, function(err, results) { //relate
        dbcallback(err);
        console.log(results);
        process.exit();
      });
    });
  });
});