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
var helpers = require('express-helpers')(app); //Using the latest express-helpers from https://github.com/tanema/express-helpers
var routes = require('./routes');
var products = require('./controllers/productController');
var navNodes = require('./controllers/navController');



app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', navNodes.readByName, routes.index);
app.get("/warehouse/", routes.index);
app.get('/catalog/', routes.catalog);
app.get('/products/', products.readAll, routes.products);
// app.get('/product/:product', products.readOneById, routes.product);

app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
