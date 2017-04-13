var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

var express = require("express");
var router = express.Router();

var cheerio = require("cheerio");
var request = require("request");

var exphbs = require("express-handlebars");

module.exports = function(app){

//get main page, before scraping. 
	app.get("/", function(req, res){
		res.render("index");
	});

	app.get("/saved", function(req, res){
		Article.find({}, function(error, doc){
			if(error){
				console.log(error);
			}else{
				//console.log(doc);
				hbsObject = {
					saved: true,
					Articles: doc
				};
				res.render("Index", hbsObject);
			}
		});
	});

	app.get("/new", function(req, res){
		request("https://www.reddit.com/r/buffalobills", function(error, response, html){
			var $ = cheerio.load(html);

			var result = [];

			$("p.title").each(function(i, element){
				var title = $(this).children("a").text();
				var url = $(element).children().attr("href");
				// console.log("Title: "+title);
				// console.log("URL: "+url);

				result.push({
					title: title,
					url: url
				});
			});
			var hbsObject = {
				new: true,
				Articles: result
			}
			res.render("Index", hbsObject);
		});
	});

}