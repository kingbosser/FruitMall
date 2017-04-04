 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 // 地址模式，通用，发货，账单可以用到
 var AddressSchema = new Schema({
 	// 详细地址
 	addr: String,
 	// 收货人姓名
 	name: String,
 	//收货人联系方式
 	tel: Number
 });
 mongoose.model('Address',AddressSchema);

 //产品模式
 var ProductSchema = new ProductSchema({
 	//产品标题
 	title: String,
 	//产品图片地址
 	imgFile: String,
 	//市场价
 	delPrice: Number,
 	//销售价
 	shopPrice: Number
 });
 mongoose.model('Product',ProductSchema);