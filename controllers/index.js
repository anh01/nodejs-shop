/* Controllers defined here */
var catalogDef = require('../model/catalog');
var Product = catalogDef.model.product;
var Id = catalogDef.id;
var cmsDef = require("../model/cms");
var NavNode = cmsDef.model.navNode;

exports.productController = {
  readOneById : function(req, res, next) {
    var pid = req.param('product');
    console.log("retrieve product " + pid);
    Product.findById(pid).populate('image').lean(true).exec(function(err, product) {
      if(product) {
        res.locals.product = product;
      } else {
        console.log("not found " + pid );
        res.locals.product = {};
      }
      console.dir(res.locals.product);
      next();
    });
  },
  readAll : function(req, res, next) {
    Product.find({}, null, { lean: true }, function(err, products) {
      if(products) {
        res.locals.products = products;
      } else {
        res.locals.products = [];
      }
      next();
    });
  }
};

exports.navController = {
  readByName: function (req, res, next) {
    var nid = 'primary nav';
    NavNode.find({name:nid}, { lean: true },function(err, navNodes) {
      console.dir(navNodes);
      if(navNodes) {
        res.locals.navNodes = navNodes;
      } else {
        res.locals.navNodes = [{}];
        res.locals.navNodes[0].childNodes=[];
      }
      next();
    });
  }
};
