var crypto = require("crypto");
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
require("../models/model.js");
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');

//加密函数
function hashPW(pwd){
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

//注册函数
exports.signup = function(req,res){
	var user = new User({username:req.body.username});
	user.set('password',hashPW(req.body.password));
	user.set('email',req.body.email);
	console.log(1)
	console.log(req.body);
	user.save(function(err){
		if(err){
			res.redirect('/signup');
			console.log(err);
		}else{
			req.session.user = user._id;
			req.session.username = user.username;
			res.redirect('/');
		}
	});
};

//登录函数
exports.login = function(req,res){
	User.findOne({username: req.body.username}).exec(function(err,user){
		if(!user){
			err = '用户不存在';
			console.log(err);
		}else if(user.password === hashPW(req.body.password)){
			req.session.user = user._id;
			req.session.username = user.username;
			res.redirect('/');
		}else{
			err = '认证失败';
			console.log(err);
		}
		if(err){
			req.session.regenerate(function(){
				res.redirect('/login');
			});
			console.log(err);
		}
	});
};

//查找用户资料
exports.getUserProfile = function(req,res){
	User.findOne({_id: req.session.user}).exec(function(err,user){
		if(!user){
			res.status(404).json({err: '用户不存在'});
		}else{
			res.status(200).json(user);
		}
	});
};

//管理员登录实现
exports.adminlogin = function(req,res){
	Admin.findOne({adminname: req.body.adminname}).exec(function(err,admin){
		if(!admin){
			err = '管理员不存在';
			req.session.destroy(function(){
				res.redirect('/admin/login');
			});
			console.log(err);
		}else if(admin.adminpassword === req.body.adminpassword){
			req.session.adminname = admin.adminname;
			res.redirect('/admin');
		}else{
			err = '认证失败';
			console.log(err);
		}
		if(err){
			req.session.regenerate(function(){
				res.redirect('/admin/login');
			});
			console.log(err);
		}
	});
};

//更新购物车
exports.updateCart = function(req,res){
	User.update({username: req.session.username},{$set:{cart:req.body.updatedCart}}).exec(function(err,results){
		if(err || results < 1){
			res.status(404).json({err:'更新购物车失败'});
		}else{
			res.status(200).json({msg:'更新成功'});
		}
	})
};


