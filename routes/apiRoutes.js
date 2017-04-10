var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

module.exports = function (app){

	app.post("/articles", function(req, res){
		var newArticle = new Article(req.body);

		newArticle.save(function(err, doc){
			if(err){
				console.log(err);
			}else{
				console.log(doc);
			}
		});
	});

}