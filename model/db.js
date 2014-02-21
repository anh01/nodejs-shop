var mongoose = require("mongoose");
var dbconfig = require ("../config/db");
var host = dbconfig.host;
var port = dbconfig.port;
var user = dbconfig.user;
var pwd = dbconfig.pwd;
var database= dbconfig.database;
var options = {user: user, pass: pwd, keepAlive: 1};
var url = dbconfig.url || dbconfig.protocol + '://username:password@'+host+':'+port+'/' + database;

function terminateCleanly() {
  disconnect(function() { 
    process.exit();
  });
};
process.on('SIGINT', terminateCleanly);
process.on('SIGTERM', terminateCleanly);
process.on('SIGHUP', terminateCleanly);


/**
 * @poram connectionCallback the callback function to handle db events
 */
exports.connect = function(connectionCallback) {
  console.log("Connecting to database " + url );
  mongoose.connect(url, options, connectionCallback);
  return mongoose.connection;
};

var disconnect = exports.disconnect = function(next) {
  console.log("Closing database connections");
  mongoose.disconnect(function() {
    console.log("Database connections closed.");
    if ('function' === typeof next) {
      next();
    }
  });
}
