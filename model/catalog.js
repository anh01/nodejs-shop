var mongoose = require("mongoose");
var plugin = require('./plugins.js');
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
  end: Date
});
productSchema.plugin(plugin.modified, {index: true});
productSchema.plugin(plugin.created);
productSchema.plugin(plugin.start);

var skuSchema = new Schema({
  product: {type: Id, ref: 'Product'}
});
skuSchema.plugin(plugin.modified, {index: true});
skuSchema.plugin(plugin.created);


var catalogSchema = new Schema({
  name: String,
  products: [{type: Id, ref: 'Product'}],
  categories: [{type: Id, ref: 'Category'}],
});
catalogSchema.plugin(plugin.modified, {index: true});
catalogSchema.plugin(plugin.created);

var categorySchema = new Schema({
  name: String,
  parent: {type: Schema.Types.ObjectId, ref: 'Category'},
  children: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  created: {type: Date, default: Date.now},
});
categorySchema.plugin(plugin.modified, {index: true});
categorySchema.plugin(plugin.created);

var model = {
  product : mongoose.model('Product', productSchema),
  sku : mongoose.model('Sku', skuSchema),
  category : mongoose.model('Category', categorySchema),
  catalog: mongoose.model('Catalog', catalogSchema),
};

exports.model = model;
exports.id = Id;

