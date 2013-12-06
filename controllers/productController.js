/* Controllers defined here */
 var catalogDef = require('../model/catalog'); //refactored out for dependency injection 
 var Product = catalogDef.model.product;
var product = Product; //until I do DI properly.;

module.exports = exports = {
  init: function(catalogDef) {
    product = catalogDef.model.product;
  },

  readOneById : function(req, res, next) {
    var pid = req.param('product');
    // console.log("retrieve product " + pid);
    product.findOne({_id: pid}) //TODO move finder interface into product
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
  },
  readAll : function(req, res, next) {
    product.find({}, null, { lean: true }, function(err, products) {
      if(products) {
        res.locals.products = products;
      } else {
        res.locals.products = [];
      }
      next();
    });
  }
};
