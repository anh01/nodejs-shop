var mongoose = require("mongoose");
var host = 'paulo.mongohq.com';
var port = 10094;
var user = 'shop';
var pwd = 'Sh0p!';
var database= 'doctoruseful';
var options = {user: user, pass: pwd, keepAlive: 1};
var urlexternal = 'mongodb://username:password@'+host+':'+port+'/' + database;
var urllocal = 'mongodb://'+process.env.IP+'/shop';
var url = urlexternal;

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
