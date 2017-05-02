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
 var ProductSchema = new Schema({
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

 //数量模式，用于描述购买产品数量
 var ProductQuantitySchema = new Schema({
 	//购买的产品数目
 	quantity: Number,
 	//购买的产品信息
 	product: [ProductSchema]
 });
 mongoose.model('ProductQuantity',ProductQuantitySchema);


 //订单模式
 var OrderSchema = new Schema({
 	//与用户id相关联
 	userid: String,
 	//用户购买的产品和数量
 	items: [ProductQuantitySchema],
 	//送货地址
 	address: [AddressSchema],
 	//订单状态
 	status: {type: String,default: "未付款"},
 	//下单时间
 	timestamp: {type: Date,default: Date.now}
 });
 mongoose.model('Order',OrderSchema);


 //顾客模式
 var CustomerShema = new Schema({
 	//id
 	username: {type: String, unique: true, required: true},
 	//密码
 	password: String,
 	email: String,
 	//收货地址
 	address: [AddressSchema],
 	//购物车
 	cart: [ProductQuantitySchema]
 });
 mongoose.model('User',CustomerShema);

 //管理员模式
 var AdminShema = new Schema({
 	adminname: {type: String, unique: true, required: true},
 	adminpassword: String
 });
  mongoose.model('Admin',AdminShema);