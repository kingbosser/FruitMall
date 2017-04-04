var express = require("express");

var app = express();
app.engine('pug',require('pug').__express);
app.set('views','./views');
app.set('view engine','pug');

app.use('/static',express.static('./static'));

require("./routes.js")(app);
app.listen(3000);