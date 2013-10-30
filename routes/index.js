
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
  res.render('products', {products: res.locals.products, title: title("Products")});
};
exports.product = function(req,res) {
  var t = title(":Product");
  if(res.locals.product) {
    t = res.locals.product.name + t;
  }
  res.render('product', {title: t, product: res.locals.product});
};
