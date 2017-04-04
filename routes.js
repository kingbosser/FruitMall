//var express = require("express");

module.exports = function(app){
	app.get('/',function(req,res){
		res.render('index.pug');
	});
	app.get('/product',function(req,res){
		res.render('product-list.pug');
	});
	app.get('/product/detail',function(req,res){
		res.render('product-detail.pug');
	});
	app.get('/product/car',function(req,res){
		res.render('product-car.pug');
	});
	app.get('/product/order',function(req,res){
		res.render('product-order.pug');
	});
	app.get('/product/success',function(req,res){
		res.render('product-success.pug');
	});
	app.get('/login',function(req,res){
		res.render('login.pug');
	});
	app.get('/signup',function(req,res){
		res.render('signup.pug');
	});
	app.get('/admin',function(req,res){
		res.render('admin-order.pug');
	});
}