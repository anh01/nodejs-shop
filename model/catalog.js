var mongoose = require("mongoose");
var Media = require('./media').mediaSchema;
var Schema = mongoose.Schema;
var Id = Schema.Types.ObjectId;

//basic definition for category/product hierarchy
//products have an image media type (property: image)
// All objects have implicit _id for identifying them (thanks MongoDB)
var productSchema = new Schema({
  name: String,
  description: String,
  image: {type: Id, ref: 'Media'},
  start: {type: Date, default: Date.now},
  end: Date,
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

var skuSchema = new Schema({
  product: {type: Id, ref: 'Product'}
});

var catalogSchema = new Schema({
  name: String,
  products: [{type: Id, ref: 'Product'}],
  categories: [{type: Id, ref: 'Category'}],
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

var categorySchema = new Schema({
  name: String,
  parent: {type: Schema.Types.ObjectId, ref: 'Category'},
  children: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

var model = {
  product : mongoose.model('Product', productSchema),
  sku : mongoose.model('Sku', skuSchema),
  category : mongoose.model('Category', categorySchema),
  catalog: mongoose.model('Catalog', catalogSchema),
};

exports.model = model;
exports.id = Id;

