var catalog = require('../../model/catalog');
var async = require('async'); //for parallel creation of products, categories, etc.
var dataTools = require('./dataTools');
var create = dataTools.create;
var createRelationship = dataTools.createRelationship;
var clean = dataTools.clean;
var dbcallback = dataTools.dbcallback; //default callback handler
var ProductModel = catalog.model.product;
var CategoryModel = catalog.model.category;



/*
clean = dataTools.clean;
var dbcallback = dataTools.dbcallback; //default callback handler
var ProductModel = catalog.model.product;
var CategoryModel = catalog.model.category;



/*
var Catalog = catalog.model.Catalog;
var catalogues = [
];
create(Catalog, catalogues);
*/

var categories = [
  {name: 'root'},
  {name: 'Transportation'},
  {name: 'Planes'}, 
  {name: 'Trains'}, 
  {name: 'Automobiles'} 
];

var products = [
  {name: "Bike", description: "trek Madone 7.1"},
  {name: "Car", description: "Lambourghini Gallardo Superleggera"},
  {name: "Plane", description: "Grumman F16a Strike Eagle"},
  {name: "Train", description: "Stephenson's Rocket"}
];


var createProducts = function(callback) {
  this.create = create;
  this.create(ProductModel, products, callback);
};
var createCategories = function(callback) {
  this.create = create;
  this.create(CategoryModel, categories, callback);
};

var createParent = function(data, callback) {
  data.property = 'parent';
  data.type = CategoryModel;
  createRelationship(data, callback);
};

var cleanFunctions = [
    function(dbcallback) {clean(ProductModel, dbcallback);},
    function(dbcallback) {clean(CategoryModel, dbcallback);}
    ];
var createFunctions = 
  [
    function(dbcallback) {createCategories(dbcallback);},
    function(dbcallback) {createProducts(dbcallback);}
  ];
  
var createCategoryRelationshipFunctions = [
  function(dbcallback) {createParent({subject: categories[1], object: categories[0]}, dbcallback)},
  function(dbcallback) {createParent({subject: categories[2], object: categories[1]}, dbcallback)},
  function(dbcallback) {createParent({subject: categories[3], object: categories[1]}, dbcallback)},
  function(dbcallback) {createParent({subject: categories[4], object: categories[1]}, dbcallback)}
  ];

var conn = dataTools.setupConnection();

conn.on('open', function() {
  //TODO:
  //clean
  //then
  //create
  //then
  //relate
  
  async.parallel(cleanFunctions,
    function(err, results){
      dataTools.dbcallback(err);
      async.parallel(createFunctions,
        function(err, results) {
          dataTools.dbcallback(err);
          async.parallel(createCategoryRelationshipFunctions, function(err, results) {
            dbcallback(err);
            console.log(results);
            process.exit();
          });
      });
  });
});