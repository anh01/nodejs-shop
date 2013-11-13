/**
 * Collection of plugins used by most model items
 */ 
exports.modified = function modifiedPlugin(schema, options) {
  schema.add({modified:Date});
  schema.pre('save', function (next) {
    this.modified = new Date();
    console.log("modified:" + this.modified);
    next();
  });

  if (options && options.index) {
    schema.path('modified').index();
  }
};

exports.created = function createdPlugin(schema, options) {
  schema.add({created: Date});
  schema.pre('save', function(next) {
    console.log("saving with created property");
    if (!this.created) {
      this.created = new Date;
    }
    console.log("saving with created property " + this.created);
    next();
  });
};

exports.start = function startPlugin(schema, options) {
  schema.add({start: Date});
  schema.pre('save', function(next) {
    if(!this.start) {
      this.start = new Date();
    }
    console.log("saving with start property " + this.start);
    next();
  });
  
};

// exports.media = function mediaPlugin(schema, options) {
//   schema.add({media: Media});
// };