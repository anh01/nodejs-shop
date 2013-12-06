var shoproot='../../../';
var authLib = require(shoproot+ 'auth/lib/auth.js');
var mockito = require('jsmockito').JsMockito;
//require('mocha');
var express = require('express')();
// var passport = require('passport');
// var strategy = require('passport-local').Strategy;
var User = {};
var Passport = {};
var Strategy = {};

var res = null;
var next = null;

var req = null;
var auth;

var assert = require('assert');
var should = require('should');


describe('Auth', function() {
  beforeEach(function(done) {
    req = {path: ''};
    auth = new authLib(User, Passport, Strategy);
    res = mockito.mock(express.response);
    next = mockito.mockFunction();
    done();
    
  });
  afterEach(function(done) {
    req = null;
    res = null;
    next = null;
    auth = null;
    done();
  });
  describe('ensureHasPermission', function() {
    it('initializes correctly', function() {
      assert.deepEqual(auth.ensureHasPermission().defaultAllowed,['/cart','/product','/login','/logout']);
    });
    
  });
  describe('check(req,res,next)', function() {
    it('allows access for base location', function() {
      req.path = '/';
      req.user = null;
      
      auth.ensureHasPermission().check(req, res, next);
      
      mockito.verify(next)();
    });
    if('allows access for product location', function() {
      req.path='/product';
      
      auth.ensureHasPermission().check(req, res, next);
      
      mockito.verify(next)();
    });
    it('allows access for cart location', function() {
      req.path='/cart';
      auth.ensureHasPermission().check(req, res, next);
      mockito.verify(next)();
    });
    it('allows access for admin location when user has admin action', function() {
      req.path='/admin';
      req.user = {roles:[{action:'/admin'}]};
      
      auth.ensureHasPermission().check(req, res, next);
      
      mockito.verify(next)();
    });
    it('denies access for admin location when user has no roles', function() {
      req.path='/admin';
      req.user = {roles:[]};
      
      auth.ensureHasPermission().check(req, res, next);
      
      mockito.verifyZeroInteractions(next);
      mockito.verify(res).redirect("/login");
    });
    it('denies access for admin location when user has null roles', function() {
      req.path='/admin';
      req.user = {roles:null};
      
      auth.ensureHasPermission().check(req, res, next);
      
      mockito.verifyZeroInteractions(next);
      mockito.verify(res).redirect("/login");
    });
     it('denies access for admin location when user does not have admin action', function() {
      req.path='/admin';
      req.user = {roles:[]};
      
      auth.ensureHasPermission().check(req, res, next);
      
      mockito.verifyZeroInteractions(next);
      mockito.verify(res).redirect("/login");
    });
  });
});
