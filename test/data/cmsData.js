var cms = require('../../model/cms');
var async = require('async'); //for parallel creation of products, categories, etc.
var dataTools = require('./dataTools');
var LinkModel = cms.model.link;


var links = [
  {value: "Home", href: "/"},
  {value: "Catalogs", href: "/catalogs/"},
  {value: "Categories", href: "/categories/"},
  {value: "Products", href: "/products/"},
  {value: "Warehouse", href: "/warehouse/"},
];

var cleanLinks = function(callback) { 
  dataTools.clean(LinkModel, callback)
};

var createLinks = function(callback) {
  dataTools.create(LinkModel, links, callback);
};

var createNavNodes = function(callback) {
    callback(null, "TODO: createNavNodes");
};

var createNavNodeRelations = function(callback) {
    callback(null, "TODO: createNavNodeRelations");
};

var conn = dataTools.setupConnection();

conn.on('open', function(){
  async.series([
    cleanLinks,
    function(callback) {
      async.parallel([
        createLinks, 
        createNavNodes
        ]
      );
    },
    createNavNodeRelations
    ],
    function(err, results) {
      dataTools.dbcallback(err);
      process.exit();
    });
});

