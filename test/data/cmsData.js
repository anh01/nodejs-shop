var cms = require('../../model/cms');
var async = require('async'); //for parallel creation of products, categories, etc.
var dataTools = require('./dataTools');
var LinkModel = cms.model.link;
var NavNodeModel = cms.model.navNode;


var links = [
  {value: "Home", href: "/"},
  {value: "Catalogs", href: "/catalogs/"},
  {value: "Categories", href: "/categories/"},
  {value: "Products", href: "/products/"},
  {value: "Warehouse", href: "/warehouse/"},
];

var navNodes = [
  {displayName: 'Root'},
  {displayName: 'Transportation'},
  {displayName: 'Planes'}
];
var navNodeRelationships = [
];


var cleanFunctions = [
  function(callback) {dataTools.clean(LinkModel, callback)},
  function(callback) {dataTools.clean(NavNodeModel, callback)}
  ];



var createLinks = function(callback) {
  dataTools.create(LinkModel, links, callback);
};

var createNavNodes = function(callback) {
  dataTools.create(NavNodeModel, navNodes, callback);
};

var createNavNodeRelations = function(callback) {
    callback(null, "TODO: createNavNodeRelations");
};

var conn = dataTools.setupConnection();

conn.on('open', function(){
  async.series([
    function(callback) {
      async.parallel(cleanFunctions, callback);
    },
    function(callback) {
      async.parallel([createLinks, createNavNodes], callback);
    },
    createNavNodeRelations
    ],
    function(err, results) {
      dataTools.dbcallback(err);
      console.log(results);
      process.exit();
    });
});

