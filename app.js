/**
 * Use app.js as the dependency injector for all the controllers, etc.
 */
var db = require('./model/db');

var conn = db.connect(function(err) {
    if(err) throw err;
    console.dir(arguments);
  });

/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
require('express-helpers')(app); //Using the latest express-helpers from https://github.com/tanema/express-helpers
var routes = require('./routes');
var CatalogDef = require('./model/catalog');
var CmsDef = require('./model/cms');
//var InventoryDef = require('./model/inventory');
var Cart = require('./controllers/cartController'); //requires request.model.catalog
var Products = require('./controllers/productController'); //requires request.model.catalog
var NavNodes = require('./controllers/navController');//requires request.model.cms

var cart = new Cart(CatalogDef.model.product);
var products = Products; //TODO change to objects that can be dependency injected
var navNodes = NavNodes; //TODO change to object that can be dependency injected
//FIX: the auth stuff doesn't use nice DI
var auth = require('./auth/config')(); //sets up all authentication
var user = require('./controllers/userController')(auth.passport); //injection of passport

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'IThoughtThatMoo-sic:Mattered' }));
  auth.init(app);
  
  //set up schema access
  app.use(function(req,res,next){
    req.catalogModel = CatalogDef.model;
    req.model = {
      cms: CmsDef.model,
      catalog: CatalogDef.model
    };
    next();
  });

  app.use(app.router);
  app.use('/public', express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Always Routes
var middleware = [navNodes.readByName, user.getCurrentUser];

//TODO move to user controller?
var ensurePermissions = auth.ensureHasPermission();
app.get('/', middleware, routes.index);
app.get('/products/', middleware, products.readAll, routes.products);
app.get('/product/:product', middleware, products.readOneById, routes.product);
app.get('/login', middleware, routes.login);
app.get('/logout', user.logout);
app.get('/angular', function(req, res) {  res.render('angular');});
app.get('/.*', middleware, function(req, res) {res.render();});

//protected areas
app.get('/admin', ensurePermissions.check, middleware, routes.adminHome);
app.get('/warehouse/',  ensurePermissions.check, middleware,routes.index);
app.get('/catalog/', ensurePermissions.check, middleware, routes.catalog);

app.all('/cart/', middleware, cart.getStack, routes.cart);
console.log(cart, cart.addStack);

app.all('/cart/add/:product/:qty', cart.addStack);
app.all('/cart/update/:product/:qty', cart.modifyStack);
app.all('/cart/remove/:product', cart.removeStack);

app.post('/login', user.authenticate);


app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
