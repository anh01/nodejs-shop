/* options: db shop testdata */
 var childProcess = require('child_process');


function processArgs(argv) {
  var args = [];
  for(var i = 2; i < argv.length; i++) {
    args.push(argv[i]);
  }
  console.dir(args);
  return args;
}

function executeCommandChain(actions, commands) {
  if(commands) {
    var length = commands.length;
    for(var i = 0; i < length; i++) {
        commands[i](actions);
    }
  }
}

function runCommand(actions, options) {
  console.dir(options); 
  if(actions.indexOf(options.action) > -1) {
    console.log("running " + options.action);
    var cp = childProcess.exec(options.command, function(error, stdout, stderr) {
      if (error) {
       console.log(error.stack);
       console.log('Error code: '+error.code);
       console.log('Signal received: '+error.signal);
       console.log('Child Process STDERR: '+stderr);
      }
      console.log('Child Process STDOUT: '+stdout);
    });
    cp.on('exit', function (code, signal) {
      console.log('Child process exited with exit code '+code + ':' + signal);
    });
    cp.on('close', function (code) {
      console.log('Child process closed with exit code '+code);
    });
    cp.on('message', function(message) {
      console.log(message);
    });
  }
}


/* These are the command functions */
function startDb(actions) {
  var command = "./mongod --fork --logpath mongodb/log/mongodb.log";
  runCommand(actions, {command: command, action:'db:start'});
}
function shutdownDb(actions) {
  var command = "./mongod --shutdown";
  runCommand(actions, {command: command, action:'db:shutdown'});
}
function startShop(actions) {
  var command = "node nodejs/shop/app";
  runCommand(actions, {command:command, action: 'shop'});
}
function  testData(actions) {
  var command = "node test/data/catalog";
  runCommand( actions, {command: command, action: 'testdata'});
}

executeCommandChain(processArgs(process.argv), [startDb, shutdownDb, startShop, testData]);
