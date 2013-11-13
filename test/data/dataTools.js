var async = require('async');

var updateInsertModel = function(model, testData, callback) {
  //Can't use upsert mode with mongoose and plugins - doesn't save.
  var options = {upsert:true};
  var query = testData;
  var update = testData;
  this.createANewOne = function(model, update) {
    this.model = model;
    this.update = update;
    
    this.saveMe = function() {
      model.save(update), function(error, doc) {
        if(error) {
          callback(error, null);
        } else {
          callback(null, doc.modelName + ":" +doc._id)
        }
      }
    }
  }
  model.findOneAndUpdate(query, update, options, function(error, doc) {
    if(error) {
      callback(error, null);
    } else {
      console.log("findOneAndUpdate", doc);
      if(!doc) {
        callback("Not created", null);
      } else {
        doc.save(function(err, doc, number){
          if(err) {
            callback(err, null);
          } else {
            callback(null, doc.modelName + ":" + doc._id);
          }
        });
      }
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
 * TODO fix this so that it follows the async pattern of callback(error, result);
 */
function createRelationship(data, next) {
  if(data.type) { //single type relationship
    data.parenttype = data.type;
    data.childtype = data.type;
  }
  data.parenttype.findOne(data.subject, function(err, sdoc) {
    dbcallback(err, null);
    if(sdoc) {
      data.childtype.findOne(data.object, function(err, odoc) {
        if('array' === typeof sdoc[data.property]) {
          sdoc[data.property].push(odoc._id);
        } else { //assume non-collection
          sdoc[data.property] = odoc._id;
        }
        sdoc.modified = new Date();
        sdoc.save(function(err, doc){
          dbcallback(err, null);
          if(doc) {
            console.log("created relationship " + doc._id +"->" + doc[data.property]);
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
      callback(null, 'Cleaned ' + type.modelName);
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

