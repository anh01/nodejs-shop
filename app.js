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
var products = require('./controllers/productController');
var navNodes = require('./controllers/navController');
var auth = require('./auth/config')(); //sets up all authentication
var user = require('./controllers/userController')(auth.passport); //injection of passport



app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'IThoughtThatMusic Mattered' }));
  auth.init(app);
  app.use(app.router);
  app.use('/public', express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Always Routes
var middleware = [navNodes.readByName, user.getCurrentUser];

app.get('/', middleware, routes.index);
app.get('/warehouse/', middleware, routes.index);
app.get('/catalog/', middleware, routes.catalog);
app.get('/products/', middleware, products.readAll, routes.products);
app.get('/product/:product', middleware, products.readOneById, routes.product);
app.get('/cart/', middleware, routes.cart); //FIXME use Ajax to get cart contents.
app.get('/login', middleware, routes.login);
app.get('/logout', user.logout);

app.post('/login', user.authenticate);


app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
