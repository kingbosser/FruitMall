var express = require("express");
var crypto = require("crypto");
module.exports = function(app){
	var users = require("./controllers/users-controller.js");
	var products = require("./controllers/products-controller.js");
	var order = require("./controllers/orders-controller.js");
	app.use('/static',express.static('./static'));

	app.get('/',function(req,res){
		if(req.session.user){
			res.render('index.pug',{
				username: req.session.username

			});
		}else{
			res.render('index.pug',{

			});
		}
	});

	app.get('/signup',function(req,res){
		res.render('signup.pug');
	});

	app.get('/login',function(req,res){
		if(req.session.user){
			res.redirect('/');
		}
		res.render('login.pug');
	});

	app.get('/logout',function(req,res){
		req.session.destroy(function(){
			res.redirect('/');
		});
	});

	app.post('/signup',users.signup);
	app.post('/login',users.login);
	app.get('/user/profile',users.getUserProfile);
	

	app.get('/admin',function(req,res){
		if(req.session.adminname){
			res.render('admin-pro.pug');
		}else{
			res.redirect('/admin/login');
		}
	});
	app.get('/admin/login',function(req,res){
		res.render('admin-login.pug');
	});
	app.get('/admin/logout',function(req,res){
		req.session.destroy(function(){
			res.redirect('/admin/login');
		});
	})
	app.post('/admin/login',users.adminlogin);

	app.get('/product/list',function(req,res){
		if(req.session.user){
			res.render('product-list.pug',{
				username: req.session.username
			});
		}else{
			res.render('product-list.pug');
		}
		
	});
	app.get('/product/detail',function(req,res){
		if(req.session.user){
			res.render('product-detail.pug',{
				username: req.session.username
			});
		}else{
			res.render('product-detail.pug');                                                    
		}
	});

	app.post('/user/cart',users.updateCart);                                                                                                                                                               

	//后台信息展示
	app.get('/admin/addProduct',function(req,res){
		if(req.session.adminname){
			res.render('admin-pro.pug');
		}else{
			res.redirect('/admin/login');
		}
	});
	app.post('/admin/addProduct',function(req,res){
		if(req.session.adminname){
			products.addProduct();
		}else{
			res.redirect('/admin/login');
		}
	})

}