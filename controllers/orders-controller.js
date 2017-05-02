var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
require("../models/model.js");
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Address = mongoose.model('Address');

//获取单个订单
exports.getOrder = function(req,res){
	Order.findOne({_id:req.query.orderId}).exec(function(err,order){
		if(!order){
			res.status(404).json({msg:'order not found'});
		}else{
			res.json(order);
		}
	});
};

//获取所有订单
exports.getOrders = function(req,res){
	Order.find({userid: req.session.username}).exec(function(err,orders){
		if(!orders){
			res.status(404).json({msg:'orders not found'});
		}else{
			res.status(200).json(orders);
		}
	});
};

//生成订单
exports.addOrder = function(req,res){
	var orderAddress = new Address(req.body.updatedAddress);
	var orderItems = req.body.orderItems;
	var newOder = new Order({
		userid: 'req.session.username',
		items: orderItems,
		address: orderAddress
	});
	newOder.save(function(err,results){
		if(err){
			res.status(500).json({msg:'faild to save order'});
		}else{
			User.update({userid:req.session.username},{$set:{cart:[]}}).exec(function(err,results){
				if(err || results<1){
					res.status(404).json({msg:'faild to update cart'});
				}else{
					res.json({msg:'Order saved'});
				}
			})
		}
	})
}