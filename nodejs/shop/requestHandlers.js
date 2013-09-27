
function successResponse(response) {
  response.writeHead(200, {'Content-Type':'text/plain'});
  response.write("success");
  response.end();
}

function findProduct(data) {
  console.dir(data);
}

function product(method, data, response) {
  console.log("find a single product using " + data);
  successResponse(response);
}

function products(method, data, response) {
  console.log("find all products");
  findProduct(data);
  successResponse(response);
}

exports.product = product;
exports.products = products;