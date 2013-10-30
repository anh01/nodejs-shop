var mongoose = require("mongoose");
var Media = require('./media').mediaSchema;
var Schema = mongoose.Schema;
var Id = Schema.Types.ObjectId;
// mongoose.connect('mongodb://'+process.env.IP+'/shop');

//basic definition for category/product hierarchy
//products have an image media type (property: image)
// All objects have implicit _id for identifying them (thanks MongoDB)
/* Already defined elsewhere - what to do? */
var linkSchema = new Schema({
  value: String,
  href: String,
  image: {type: Id, ref: 'Media'},
  alt: String,
  start: {type: Date, default: Date.now},
  end: Date,
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

var navNodeSchema = new Schema({
  name: String,
  link: {type: Id, ref: 'Link'},
  childNodes: [navNodeSchema]
});


var model = {
  link : mongoose.model('Link', linkSchema),
  navNode : mongoose.model('NavNode', navNodeSchema),
};

exports.model = model;
exports.id = Id;
