var async = require('async');
var updateInsertModel = function(model, testData, callback) {
  // console.dir(model, testData);
  var options = {upsert:true};
  var query = testData;
  var update = testData;
  console.log("x", query, update, options, model.modelName, "y");
  model.findOneAndUpdate(query, update, options, function(error, doc) {
    if(error) {if(error) {
      callback(error, null);
    } else {
      callback(null, model.modelName + ' ' + testData + " created/updated");
    }
  });
};
  

function setupConnection(callback) {
  var db = require('../../model/db');
  console.log("Connecting...");
  return db.connect(callback || function(err) {
    if(err) {
      console.dir(err); 
      process.exit(1);
    }
    console.dir(arguments);
  });
}

function create(model, testData, callback) {
  console.log("Creating " + model.modelName + " objects");
  

  var items = [];
  for(var i=0; i < testData.length; i++) {
    items[i] = {data:testData[i], model: model};
  }
  
  function iterator(item, callback) {
    var model = item.model;
    var data = item.data;
    updateInsertModel(model, data, callback);
  }
  async.each(items, iterator, callback);
    
}

/**
 * @param data an object with properties subject, object, property and type
 * TODO fix this so that it follows the async pattern of callbackcallback);
    
}

/**
 * @param data an object with properties subject, object, property and type
 * TODO fix this so that it follows the async pattern of callback(erroror, result);
 */*/
function createRelationship(data, next) {
  console.dir(data);
  data.data, next) {
  console.dir(data);
  data.type.findOne(data.data.subject, function(err, sdoc) {
    dbcallback(err, null)dbcallback(err, null);
    if(sdoc) {
      data.data.type.findOne(data.data.object, function(err, odoc) {
        sdoc[data.data.property] = odoc._id;
        sdoc.modified = new Date();
        sdoc.save(function(err, doc){
          dbcallback(err, null)dbcallback(err, null);
          if(doc) {
            console.log("created relationship " + doc._id +"->" + doc[data.data.property]);
            next();
          }
        });
      });
    }
  });
}

/** 
 * Deletes all items of the specified type from the database.
 * @param type a mongoose model.
 */ 
function clean(type, callback) {
  
  console.log("cleaning out", type.modelName, "types");
  type.remove({}, function(err) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, type.modelName);
    }
  });
}

/**
 * A default dbcallback convenience function. 
 * If there is an error, then throws it. otherwise, just returns.
 */ 
var dbcallback = function(err, result) {
  if(err) throw err;
};


exports.dbcallback = dbcallback;
exports.clean = clean;
/** 
 * Deletes all items of the specified type from the database.
 * @param type a mongoose model.
 */ 
function clean(type, callback) {
  
  console.log("cleaning out", type.modelName, "types");
  type.remove({}, function(err) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, type.modelName);
    }
  });
}

/**
 * A default dbcallback convenience function. 
 * If there is an error, then throws it. otherwise, just returns.
 */ 
var dbcallback = function(err, result) {
  if(err) throw err;
};


exports.dbcallback = dbcallback;
exports.clean = clean;
exports.create = create;
exports.createRelationship = createRelationship;
exports.setupConnection = setupConnection;

