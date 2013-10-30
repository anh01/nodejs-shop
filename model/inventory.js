var mongoose = require("mongoose");
//Inventory of what? Products, that's what!
require("./catalog");

var Schema = mongoose.Schema;
var Id = Schema.Types.ObjectId;


var inventorySchema = new Schema({
  name: String,
  locale: String,
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

var stockSchema = new Schema({
  inventory: {type: Id, ref: 'Inventory'},
  sku: {type: Id, ref: 'Sku'},
  level: Number,
  backorder: Number,
  preorder: Number 
});

var priceSchema = new Schema({
  price: Number,
  currency: String,
  previousPrice: {type: Id, ref: 'Price'}
});

var model = {
  inventory: mongoose.model('Inventory', inventorySchema),
  stock: mongoose.model('Stock', stockSchema),
  price: mongoose.model('Price', priceSchema),
};

exports.model = model;
exports.id = Id;
