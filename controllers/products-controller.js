var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
require("../models/model.js");
var Product = mongoose.model('Product');

//获取单件商品
exports.getProduct = function(req,res){
	Product.findOne({_id:req.query.productId}).exec(function(err,product){
		if(!product){
			res.status(404).json({msg:'product not found'});
		}else{
			res.status(200).json(product);
		}
	});
};

//获取所有商品信息
exports.getProducts = function(req,res){
	Product.find({}).exec(function(err,products){
		if(!products){
			res.status(404).json({msg:'products not found'});
		}else{
			res.json(products);
		}
	});
};


//添加商品信息
exports.addProduct = function(req,res){
	console.log(req.body);
	// console.log(req.body);
	// var product = new Product({
	// 	title: req.body.title,
	// 	imgFile: req.body.imgFile,
	// 	delPrice: req.body.delPrice,
	// 	shopPrice: req.body.shopPrice
	// });
	// product.save(function(err,results){
	// 	if(err){
	// 		res.status(500).json({msg:'保存出错'});
	// 	}else{
	// 		res.status(200).json({msg:'保存成功'});
	// 	}
	// })
}