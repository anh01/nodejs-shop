/**
 * Converts the pid:qty[n] formatted cookie into a JSON object map of {pid:qty} key-value pairs
 */
var toJSON = function(cookie, done) {
  var object = {};
  // console.log('toJSON start', cookie, typeof cookie);
  if(cookie && cookie != 'undefined') {
    // console.log('cookie must be defined', cookie);
    var cookieArr = cookie.split(':');
    for(var i = 0; i < cookieArr.length; i=i+2) {
      object[cookieArr[i]] = safeParseInt(cookieArr[i+1]);
    }
  }
  // console.log('toJSON cookie', object);
  if(typeof done === 'function') {
    return done(object);
  } else {
    return object;
  }
};

/**
 * Converts the values in the cart back into a cookie. Need a test for this!
 */
var toCookie = function(items, done) {
  var cookie ;
  if(items ) {
    for(var pid in items) {
        if(cookie) {
          cookie = cookie.concat(':');
        } else {
          cookie = '';
        }
      // console.log('pid', pid);
      if(pid) {
        cookie = cookie.concat(pid).concat(':').concat(items[pid]);
      }
      // console.log('cookified', cookie);
    }
  }
  if(typeof done === 'function') {
    return done(cookie);
  } else {
    return cookie;
  }
};

//TODO move to somewhere helpful, like a parsingFunctions file.
var safeParseInt = function(value) {
  var number = parseInt(value, 10);
  if(isNaN(number)) {
    number = 1; //this is a quantity we're parsing; should at least find one
  }
  return number;
};


exports.toJSON = toJSON;
exports.toCookie = toCookie;
exports.safeParseInt = safeParseInt;
