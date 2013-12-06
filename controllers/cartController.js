//controller for the cart.
//saves all items as cookies.
//calculates
//app.all('/cart', middleware, routes.cart);
var async = require("async");
var util = require('./cartUtil');
//var Stock = require('../model/inventory').model.stock;//TODO USE THIS!
var cartGetUrl = '/cart/';
var product = null;

// function(CatalogDef) {
//   var controller = new controller();
//   console.log(typeof controller);
//   controller.product = CatalogDef.model.product;
//   controller.init(CatalogDef);
//   return controller;
// };

var serialize = function(req, res) {
  var cookie = util.toCookie(req.cartItems);
  if(cookie) {
    res.cookie('cart', cookie);
  } else {
    res.clearCookie('cart');
  }
  res.redirect(cartGetUrl);//TODO move this somewhere sensible - shouldn't be in here, perhaps
};

var deserialize = function(req, res, done) {
  if(req.cart === undefined) {
      var items = util.toJSON(req.cookies.cart); //map of items to qty
      req.cartItems = items;
  } 
  return done();
};

var toCartObject = function(itemMap) {
  var orderItems = [];
  for(var pid in itemMap) {
    var orderItem = {};
    orderItem.id = pid;
    orderItem.qty = itemMap[pid];
    orderItems.push(orderItem);
  }
  return {items:orderItems};
};

//app.get('/cart/', cart.get); - only on JSON
var get = function(req, res, done) {
  //get every cookie item, look it up, recalculate
  //get currency cookie
  console.log('getcart', 'cookies', req.cookies.cart);
  console.log('getcart', 'req.cart', req.cart);
  res.format({
    html: function() {done();},
    json: function(){done();},
    text: function() {done();}
  });
};

/**
 * Prerequisite: expects the cartItems to be on the request at {req.cartItems}
 */
var createCart = function(req,res,done) {
  req.cart = toCartObject(req.cartItems);
  //also make available to the page context:
  res.locals.cart = req.cart; //available in page context
  done();
};

//we can inject product here!
var addProductInfo = function(product) {
  return function(req,res,done) {
    if(product === undefined) {
      done("product was not defined on the request");
    }
    if(req.cart && req.cart.items) {
      //TODO: separate this out to a separate cart controller.
      async.each(
        req.cart.items, 
        function(item, done) {
          product.findOne({_id:item.id}, function(err, product){
            if(err) {//ignore it
              done(null, item.id);
            } else {
              //TODO convert item into a basic doc
              item.description = product.description;
              item.name = product.name;
              item.cost = 1.00;
              done(null, item.id);
            }
          });
        }, 
        function(err) {
          if(err) {
            done(err);
          } else {
            done();
          }
        }
      );
    } else {
      throw Error('cart not available on request - try calling createCart first');
    }
  
  };
};
//Closures nightmare!
// var ProductInfoProcessor = function(product) {
//   this.product = product;
//       console.log("product:", this.product);

//   //this is the only function that cares about the product model at the momentcartC
//     /**
//     * Follows the async library callback(err, message) format.
//     * Used in addProductInfo function.
//     */
//   this.addProductToEachCartItem = function(productSchema) {
    
//   //this is the closure!  
//   return function(item, done) {
//     console.log("product:", this.product);
//     this.productSchema.findOne({_id:item.id}, function(err, product){
//       if(err) {//ignore it
//         done(null, item.id);
//       } else {
//         convert(item, product);
//         //TODO convert item into a basic doc
//         item.description = product.description;
//         item.name = product.name;
//         item.cost = 1.00;
//         done(null, item.id);
//       }
//     });
//   };
    
//   };
//   function convert(item, product) {
//     item.name = product.name;
//     item.description = product.description;
//     item.cost = 1.00;
    
//   }
//   this.addProductInfo = function(product, callback){
//     // this.product = product;
//     this.callback = callback(product);
// return function(req,res,done) {
//     console.log("product:", product);
//     // if(product === undefined) {
//     //   done("product was not defined on the request");
//     // }
//     if(req.cart && req.cart.items) {
//       //TODO: separate this out to a separate cart controller.
//       async.each(
//         req.cart.items, 
//         callback(product),
//         // function(item, done) {
//         //   product.findOne({_id:item.id}, function(err, product){
//         //     if(err) {//ignore it
//         //       done(null, item.id);
//         //     } else {
//         //       //TODO convert item into a basic doc
//         //       item.description = product.description;
//         //       item.name = product.name;
//         //       item.cost = 1.00;
//         //       done(null, item.id);
//         //     }
//         //   });
//         // }, 
//         function(err) {
//           if(err) {
//             done(err);
//           } else {
//             done();
//           }
//         }
//       );
//     } else {
//       throw Error('cart not available on request - try calling createCart first');
//     }
//   };
//   }(this.product, this.addProductToEachCartItem);

//   return this;
// };

var calculateTax = function(req,res,done) {
  //take items, look up their cost, multiply by the numbers, set values
  if(req.cart) {
    req.cart.tax = {name:'VAT', lines:[{rate:20.0,cost:0.03}]}; //dummy values
  }
  done();
};

var calculateShipping = function(req,res,done) {
  if(req.cart) {
    req.cart.shipping = {cost:0.01, note:'TODO'}; //dummy values
  }
  done();
};

var calculateTotal = function(req,res,done) {
  if(req.cart) {
    req.cart.total = {cost:0.02, note:'TODO'}; //dummy values
  }
  done();
};

//modify the req.cartItem map
//app.post('/cart/add/:product/:qty', cart.addItem);
var addItem = function(req, res, done) {
  var pid = req.params.product;
  var qty = util.safeParseInt(req.params.qty);
  console.log('addtocart','cookies!', pid, qty);
  var cart = req.cartItems; //get from the request
  if(cart && cart[pid]) {
    cart[pid] = cart[pid] + qty;
  } else {
    cart[pid] = qty;
  }
  done();
};
//app.post('/cart/remove/:product', cart.removeItem);
var removeItem = function(req,res,done) {
  var cart = req.cartItems; //deserialised cookie values
  if(cart && cart[req.params.product]) {
    delete cart[req.params.product];
  }
  done();
};
var modifyItem = function(req,res,done) {
  //TODO implement me
  done();
};

var calculate = {
  total: calculateTotal,
  shipping: calculateShipping,
  tax: calculateTax
};
var controller = function(product) {
  // var addProductInfo = function(product) {
  //   return function(req, res, done) {
  //     this.product = product;
  //     console.log(this.product);
  //     done();
  //   };
  // }(product);
  this.product = product;
  this.get = get;
  this.getStack = [deserialize, createCart, addProductInfo(product), calculate.tax, calculate.shipping, calculate.total];
  this.addStack = [deserialize, addItem, serialize];
  this.removeStack = [deserialize, removeItem, serialize];
  this.modifyStack = [deserialize, modifyItem, serialize];
  this.serialize = serialize;
  this.deserialize = deserialize;
  return this;
};

module.exports = exports = controller;




