var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")({session: expressSession});
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
require("./models/model.js");


var db = mongoose.connect("mongodb://localhost/myapp"); 
// var options = {
// 	db: { native_parser: true },
// 	server: { poolSize: 5 },
// 	replset: { rs_name: 'myReplicaSetName' },
// 	user: 'kingboss',
// 	pass: 'wpy678086'
// }
// var db = mongoose.connect("mongodb://localhost/myapp", options);
// var db = mongoose.createConnection();
// db.openSet("mongodb://kingboss:wpy678086@localhost:27017/myapp");


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('pug',require('pug').__express);
app.set('views','./views');
app.set('view engine','pug');


app.use(cookieParser());
app.use(expressSession({
	secret: 'SECRET',
	name: 'kingboss',
	cookie: {maxAge: 60*60*1000},
	resave: false,
	saveUninitialized: true,
	store: new mongoStore({
		url: 'mongodb://localhost/myapp'
	})
}));


require("./routes.js")(app);
app.listen(3000);