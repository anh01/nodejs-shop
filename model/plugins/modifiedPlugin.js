/**
 * Collection of plugins used by most model items
 */ 
module.exports = exports = function modifiedPlugin(schema, options) {
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
