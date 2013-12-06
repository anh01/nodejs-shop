var assert = require('assert');

var shoproot='../../../';
var cartUtil = require(shoproot+'controllers/cartUtil');

describe('CartUtil', function() {
  describe('#toJSON', function() {
    it('converts an empty value correctly', function(){
      var cookie = '';
      var cartItems = cartUtil.toJSON(cookie);
      assert.deepEqual(cartItems, {});
    });
    it('converts an undefined value safely', function(){
      var cookie = '123::';
      var cartItems = cartUtil.toJSON(cookie);
      assert.deepEqual(cartItems, {'123':1, '':1});
    });
    it('converts a non-integer value safely', function(){
      var cookie = '123:a';
      var cartItems = cartUtil.toJSON(cookie);
      assert.deepEqual(cartItems, {'123':1});
    });
    it('converts a corrupt key safely', function(){
      var cookie = '12^[]()3:a';
      var cartItems = cartUtil.toJSON(cookie);
      assert.deepEqual(cartItems, {'12^[]()3':1});
      
    });
  });
  describe('#toCookie', function() {
    it('converts no cart items correctly', function(){
      var cartItems = {};
      var cookie = cartUtil.toCookie(cartItems);
      assert.ok(cookie === undefined, 'cookie value should be undefined');
      
    });
    it('converts a single cart item correctly', function(){
      var cartItems = {'123':1};
      var cookie = cartUtil.toCookie(cartItems);
      assert.equal('123:1', cookie);
    });
    it('converts multiple cart items correctly', function(){
      var cartItems = {'123':1, '11':2}; //TODO check that the iterator on this object is deterministic
      var cookie = cartUtil.toCookie(cartItems);
      assert.ok(cookie.match(/123:1/), 'incorrectly converted value for key 123');
      assert.ok(cookie.match(/11:2/), 'incorrectly converted value for key 11');
      assert.equal(3, cookie.match(/:/g).length, 'not enough delimiters');
    });
  });
});

