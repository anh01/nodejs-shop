var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

//basic definition for category/product hierarchy
//products have an image media type (property: image)
// All objects have implicit _id for identifying them (thanks MongoDB)
var productSchema = new Schema({
  name: String,
  description: String,
  image: {type: Schema.Types.ObjectId, ref: 'Media'},
  start: Date,
  end: Date,
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

var skuSchema = new Schema({
  product: {type: Schema.Types.ObjectId, ref: 'Product'}
});

var catalogSchema = new Schema({
  name: String,
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
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

var inventorySchema = new Schema({
  name: String,
  locale: String,
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

var stockSchema = new Schema({
  inventory: {type: Schema.Types.ObjectId, ref: 'Inventory'},
  sku: {type: Schema.Types.ObjectId, ref: 'Sku'},
  level: Number,
  backorder: Number,
  preorder: Number
});

var priceSchema = new Schema({
  price: Number,
  currency: String,
  previousPrice: {type: Schema.Types.ObjectId, ref: 'Price'}
});

var mediaSchema = new Schema({
  url: String,
  type: String,
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

var model = {
  product : mongoose.model('Product', productSchema),
  sku : mongoose.model('Sku', skuSchema),
  inventory: mongoose.model('Inventory', inventorySchema),
  stock: mongoose.model('Stock', stockSchema),
  price: mongoose.model('Price', priceSchema),
  category : mongoose.model('Category', categorySchema),
  catalog: mongoose.model('Catalog', catalogSchema),
  media : mongoose.model('Media', mediaSchema)
};

exports.model = model;
