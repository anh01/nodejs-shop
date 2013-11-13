var mongoose = require("mongoose");
var plugins = require('./plugins');
var Schema = mongoose.Schema;
var Id = Schema.Types.ObjectId;

//basic definition for category/product hierarchy
//products have an image media type (property: image)
// All objects have implicit _id for identifying them (thanks MongoDB)
/* Already defined elsewhere - what to do? */
var linkSchema = new Schema({
  value: String,
  href: String,
  image: {type: Id, ref: 'Media'},
  alt: String
});
linkSchema.plugin(plugins.modified);
linkSchema.plugin(plugins.created);

var navNodeSchema = new Schema({
  displayName: String,
  adminName: String,
  link: {type: Id, ref: 'Link'},
  childNodes: [navNodeSchema]
});
linkSchema.plugin(plugins.modified);
linkSchema.plugin(plugins.created);

navNodeSchema.virtual('name').get(function(){
  return this.displayName || '[' + this.adminName = ']';
});

var model = {
  link : mongoose.model('Link', linkSchema),
  navNode : mongoose.model('NavNode', navNodeSchema),
};

exports.model = model;
exports.id = Id;
