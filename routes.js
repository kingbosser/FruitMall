var express = require("express");
var crypto = require("crypto");
module.exports = function(app){
	var users = require("./controllers/users-controller.js");
	var products = require("./controllers/products-controller.js");
	var order = require("./controllers/orders-controller.js");
	app.use('/static',express.static('./static'));

	app.get('/',function(req,res){
		if(req.session.user){
			res.render('layout.html',{
				username: req.session.username
			});
		}else{
			res.render('layout.html',{
				username: "新用户"
			});
		}
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
			res.render('admin.html');
		}else{
			res.redirect('/admin/login');
		}
	});
	app.get('/admin/login',function(req,res){
		res.render('admin-login.html');
	});
	app.get('/admin/logout',function(req,res){
		req.session.destroy(function(){
			res.redirect('/admin/login');
		});
	})
	app.post('/admin/login',users.adminlogin);
	app.get('/product/profile',products.getProducts);

	// app.get('/product/list',function(req,res){
	// 	if(req.session.user){
	// 		res.render('product-list.html',{
	// 			username: req.session.username
	// 		});
	// 	}else{
	// 		res.render('product-list.html');
	// 	}
	// });
	// app.get('/product/detail',function(req,res){
	// 	if(req.session.user){
	// 		res.render('product-detail.html',{
	// 			username: req.session.username
	// 		});
	// 	}else{
	// 		res.render('product-detail.html');                                                    
	// 	}
	// });

	app.post('/user/cart',users.updateCart);                                                                                                                                                               

	//后台信息展示
	// app.get('/admin/addProduct',function(req,res){
	// 	if(req.session.adminname){
	// 		res.render('admin-pro.html');
	// 	}else{
	// 		res.redirect('/admin/login');
	// 	}
	// });
	app.post('/admin',products.addProduct);
	app.post('/admin/remove',products.removeProduct);
	app.post('/user/addr',users.updateAddr);

}