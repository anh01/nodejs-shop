# Running the Tests #

## Prerequisites ##

### Grunt is required ###

    npm install -g grunt-cli

### Mocha is required ###

Make sure that you have run `npm install` on the main package, and installed the dev dependencies, which are:

 * [https://www.npmjs.org/package/grunt-mocha-test](https://www.npmjs.org/package/grunt-mocha-test)
 * [https://www.npmjs.org/package/jsmockito](https://www.npmjs.org/package/jsmockito)

## Running ##

Now that grunt and its dependencies are installed, just run grunt:

    grunt

And you'll see some helpful test output:


    C:\GitHub\nodejs-shop>grunt
    Running "mochaTest:test" (mochaTest) task
    1..24
    ok 1 Auth ensureHasPermission initializes correctly
    ok 2 Auth check(req,res,next) allows access for base location
    ok 3 Auth check(req,res,next) allows access for cart location
	ok 4 Auth check(req,res,next) allows access for admin location when user has admin action
	ok 5 Auth check(req,res,next) denies access for admin location when user has no roles
	ok 6 Auth check(req,res,next) denies access for admin location when user has null roles
	ok 7 Auth check(req,res,next) denies access for admin location when user does not have admin action
	ok 8 Cart deserialize(req,res) when request.cart is undefined
	ok 9 Cart deserialize(req,res) except when request.cart is defined
	ok 10 Cart serialize(req,res) an empty cart correctly
	ok 11 Cart serialize(req,res) a cart with items correctly
	ok 12 Cart .getStack always creates the cart even when no cartItems on the request
	ok 13 Cart .getStack creates the cart with cart items on the request
	not ok 14 Cart .getStack adds product information for every item in the cart
  	Error: timeout of 2000ms exceeded
      at null.<anonymous> (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runnable.js:175:14)
      at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
	not ok 15 Cart .getStack calculates tax for the whole order
	  Error: nonono!
	      at Error (<anonymous>)
	      at Context.<anonymous> (C:\GitHub\nodejs-shop\test\unit\controller\cartControllerSpec.js:141:13)
	      at Test.Runnable.run (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runnable.js:221:32)
	      at Runner.runTest (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:374:10)
	      at C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:452:12
	      at next (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:299:14)
	      at C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:309:7
	      at next (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:247:23)
	      at Object._onImmediate (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:276:5)
	      at processImmediate [as _immediateCallback] (timers.js:330:15)
	not ok 16 Cart .getStack calculates the total cost for the whole order
	  Error: nonono!
	      at Error (<anonymous>)
	      at Context.<anonymous> (C:\GitHub\nodejs-shop\test\unit\controller\cartControllerSpec.js:148:13)
	      at Test.Runnable.run (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runnable.js:221:32)
	      at Runner.runTest (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:374:10)
	      at C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:452:12
	      at next (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:299:14)
	      at C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:309:7
	      at next (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:247:23)
	      at Object._onImmediate (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:276:5)
	      at processImmediate [as _immediateCallback] (timers.js:330:15)
	not ok 17 Cart .getStack calculates the shipping cost for the whole order
	  Error: nonono!
	      at Error (<anonymous>)
	      at Context.<anonymous> (C:\GitHub\nodejs-shop\test\unit\controller\cartControllerSpec.js:156:13)
	      at Test.Runnable.run (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runnable.js:221:32)
	      at Runner.runTest (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:374:10)
	      at C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:452:12
	      at next (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:299:14)
	      at C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:309:7
	      at next (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:247:23)
	      at Object._onImmediate (C:\GitHub\nodejs-shop\node_modules\grunt-mocha-test\node_modules\mocha\lib\runner.js:276:5)
	      at processImmediate [as _immediateCallback] (timers.js:330:15)
	ok 18 CartUtil toJSON converts an empty value correctly
	ok 19 CartUtil toJSON converts an undefined value safely
	ok 20 CartUtil toJSON converts a non-integer value safely
	ok 21 CartUtil toJSON converts a corrupt key safely
	ok 22 CartUtil toCookie converts no cart items correctly
	ok 23 CartUtil toCookie converts a single cart item correctly
	ok 24 CartUtil toCookie converts multiple cart items correctly
	# tests 24
	# pass 20
	# fail 4
	Warning: Task "mochaTest:test" failed. Use --force to continue.

	Aborted due to warnings.

Ok, so I have some more testing to do...