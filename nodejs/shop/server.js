var http = require("http");
var url = require("url");


function start(route, port, ip) {
  function onRequest(request, response) {
    //TODO replace this with URL parsers.
    var parsedUrl = url.parse(request.url, true);
    var pathname = parsedUrl.pathname;
    var data = "";
    data = parsedUrl.query;

    request.setEncoding("utf8");
    request.addListener("data", function(dataChunk) {
      data += dataChunk;
      console.log("Received data chunk '"+
      dataChunk + "'.");
    });
    request.addListener("end", function() {
      console.log("data: " + data);
      route(pathname, request.method, data, response);
    });      
  }

  http.createServer(onRequest).listen(port, ip);
  console.log("Server has started.");
}

exports.start = start;