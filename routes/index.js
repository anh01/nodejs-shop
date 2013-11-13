
/*
 * GET home page.
 */
var siteName = ":Shop";

function title(prefix) {
  return prefix + siteName;
}
exports.index = function(req, res){
  res.render('index', { title: title('') });
};
exports.warehouse = function(req, res) {
  res.render('index', {title:title("Warehouse")});
};
exports.catalog = function(req,res) {
  res.render('index', {title: title("Catalog")});
};
exports.products = function(req,res) {
  res.render('products', {title: title("Products")});
};
exports.product = function(req,res) {
  var t = title(":Product");
  if(res.locals.product) {
    t = res.locals.product.name + t;
  }
  res.render('product', {title: t});
};
exports.cart = function(req, res) {
  var t = title('Cart');
  res.render('cart', {title: t});
};
exports.login = function(req, res) {
  res.render('login', {title: title('Login')});
};
