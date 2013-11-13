/* Controllers defined here */
var catalogDef = require('../model/catalog');
var Product = catalogDef.model.product;
var Id = catalogDef.id;
var cmsDef = require("../model/cms");
var NavNode = cmsDef.model.navNode;

exports.readOneById = function(req, res, next) {
  var pid = req.param('product');
  // console.log("retrieve product " + pid);
  Product.findOne({_id: pid})
  // .where('start').lt(Date.now)
  // .populate('image')
  .exec(function(err, product) {
      // console.log('product for id ', pid, product);
    if(product) {
      res.locals.product = product;
    } else {
      console.log("not found " + pid );
      res.locals.product = {};
    }
    next();
  });
};
exports.readAll = function(req, res, next) {
  Product.find({}, null, { lean: true }, function(err, products) {
    if(products) {
      res.locals.products = products;
    } else {
      res.locals.products = [];
    }
    next();
  });
};