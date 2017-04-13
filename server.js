//Include dependencies for application
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 8000;
//Middleware bodyparser
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("./public"));

//Connect to mongoose db local
mongoose.connect("mongodb://localhost/billsReddit");
//connect to mongoose db on heroku
//mongoose.connect("mongodb://heroku_hmskrc3c:c1hkamrnrjbqv7hj99t93ocbb8@ds157390.mlab.com:57390/heroku_hmskrc3c");

var db = mongoose.connection;

db.on("error", function(error){
	console.log("Mongoose Error: ", error);
});

db.once("open", function(){
	console.log("Mongoose connection successful");
});
//require routes for the application
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

app.listen(PORT, function(){
	console.log("App listening on PORT: "+PORT);
});