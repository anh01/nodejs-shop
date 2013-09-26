var handlers = require('./requestHandlers');

//create the routing table
var routeTo = {};
routeTo['/product'] = handlers.product;
routeTo['/search'] = handlers.products;
  

function route(pathname, method, data, response) {
  //fork as a separate process?
  console.log(routeTo);
  if(typeof routeTo[pathname] === 'function') {
    routeTo[pathname](method, data, response);
  } else {
    response.write("Don't know how to route " + pathname);
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end();
  }
}

exports.route = route;