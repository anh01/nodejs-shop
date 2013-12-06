var assert = require('assert');
var mocking = require('sinon');
var express = require('express');

var shoproot='../../../';
var Cart = require(shoproot+'controllers/cartController');//TODO replace with stubbed equivalent.

var request ;
var response ;
var cart;
var productModel;

describe('Cart', function() {
  beforeEach(function(done){
    request = express.request;
    request.cookies = {};
    
    productModel = {
      findOne: function(params, callback) {
        callback(null);
      }
    };
    response = express.response;
    response.locals = {};
    // response = {
    //   cookie:function(name, value) {},
    //   clearCookie:function(name) {},
    //   redirect:function(uri) {}
    // };
    cart = new Cart(productModel);
    done();
  });
  afterEach(function(done){
    request= undefined;
    response = undefined;
    done();
  });
  //TODO break down the unit test: all it should check is that the value is set or not.
  describe('#deserialize(req,res)', function(){
    it('when request.cart is undefined', function(){
      delete request.cookies.cart; //undefined
      delete request.cart;
      delete request.cartItems; //just in case

      var nextMock = mocking.mock();

      cart.deserialize(request,response,nextMock);
      
      nextMock.verify();
      assert.ok(request.cartItems);
    });  
    it('except when request.cart is defined', function(){
      request.cookies.cart = '12345:1';
      request.cart = {};//not undefined
      delete request.cartItems;
      
      var nextMock = mocking.mock();

      cart.deserialize(request,response,nextMock);
      
      nextMock.verify();
      assert.ok(request.cartItems === undefined, 'request.cartItems should be undefined');
    });  
  });
  describe('#serialize(req,res)', function(){
    it('an empty cart correctly', function() {

      var resMock = mocking.mock(response);
      var nextMock = mocking.mock();

      request.cartItems = {};
      
      resMock.expects('clearCookie').once().withArgs('cart');
      resMock.expects('redirect').once().withArgs('/cart/');
      nextMock.never();
      
      cart.serialize(request,response,nextMock);
      
      resMock.verify();
      nextMock.verify();
    });
    it('a cart with items correctly', function() {
      var resMock = mocking.mock(response);
      var nextMock = mocking.mock();

      request.cartItems = {
        '12345':1
      };
      resMock.expects('cookie').once().withArgs('cart', '12345:1');
      resMock.expects('redirect').once().withArgs('/cart/');
      nextMock.never();

      cart.serialize(request,response,nextMock);
      
      resMock.verify();
      nextMock.verify();
    });
  });
  describe('.getStack', function(){
    it('always creates the cart even when no cartItems on the request', function() {
      delete request.cartItems;
      var nextMock = mocking.mock();
      cart.getStack[1](request, response, nextMock);
      nextMock.verify();
      assert.ok(response.locals.cart, 'response.locals.cart must be defined');
      assert.ok(request.cart, 'request.cart must be defined');
      assert.equal(0, request.cart.items.length, 'unexpected items in cart');
    });
    it('creates the cart with cart items on the request', function() {
      request.cartItems = {'123':1};
      var nextMock = mocking.mock();
      cart.getStack[1](request, response, nextMock);
      nextMock.verify();
      assert.ok(response.locals.cart, 'response.locals.cart must be defined');
      assert.ok(request.cart, 'request.cart must be defined');
      assert.equal(1, request.cart.items.length, 'unexpected number of items in cart');
    });
    it('adds product information for every item in the cart', function(done) {
      var product = {'name':'bob', 'description':'description', 'id':'123'};
      var nextMock = mocking.mock();
      mocking.stub(productModel, "findOne", function(params,done){
        done(null, product);//return product
      });
      request.cartItems = {'123':1};
      request.cart={items: [{id:'123', qty:1}]};
      cart.getStack[2](request, response, nextMock);
      //nextMock.verify();
      assert.equal(request.cart.items.length, 1);
      assert.equal(request.cart.items[0].name, product.name);
      assert.equal(request.cart.items[0].description, product.description);
      assert.equal(request.cart.items[0].cost, 1.00);//TODO for later
      assert.equal(request.cart.items[0].id, product.id);

    });
    it('calculates tax for the whole order', function() {
      request.cart={};
      var nextMock = mocking.mock();
      cart.getStack[3](request, response, nextMock);
      nextMock.verify();
      
      throw Error('nonono!');
    });
    it('calculates the total cost for the whole order', function(){
      request.cart={};
      var nextMock = mocking.mock();
      cart.getStack[5](request, response, nextMock);
      nextMock.verify();
      throw Error('nonono!');
      
    });
    it('calculates the shipping cost for the whole order', function(){
      request.cart={};
      var nextMock = mocking.mock();
      cart.getStack[4](request, response, nextMock);
      nextMock.verify();
      throw Error('nonono!');
    });
  });
});

