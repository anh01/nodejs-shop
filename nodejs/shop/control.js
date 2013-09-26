var server = require("./server");
var router = require("./router");


server.start(router.route, process.env.PORT, process.env.IP); 