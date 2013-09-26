function successResponse(response) {
  response.write("success");
  response.writeHead(200, {'Content-Type':'text/plain'});
  response.end();
}

function product(method, data, response) {
  console.log("find a single product using " + data);
  successResponse(response);
}

function products(method, data, response) {
  console.log("find all products");
  successResponse(response);
}

exports.product = product;
exports.products = products;