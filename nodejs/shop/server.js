var http = require("http");
var url = require("url");


function start(route, port, ip) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var data = "";
    
    request.setEncoding("utf8");
    request.addListener("data", function(dataChunk) {
      data += dataChunk;
      console.log("Received data chunk '"+
      dataChunk + "'.");
    });
    request.addListener("end", function() {
      route(pathname, request.method, data, response);
    });      
  }

  http.createServer(onRequest).listen(port, ip);
  console.log("Server has started.");
}

exports.start = start;