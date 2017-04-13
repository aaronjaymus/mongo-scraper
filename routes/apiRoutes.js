var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
//var uniqueValidator = require("mongoose-unique-validator");

module.exports = function (app){
	//save article from scrapings to db
	app.post("/articles", function(req, res){
		var newArticle = new Article(req.body);
		//console.log(newArticle);
		newArticle.save(function(err, doc){
			if(err){
				console.log(err);
			}else{
				//console.log(doc);
			}
		});
	});
	//delete article from db
	app.post("/articles/delete/:id", function(req, res){
		Article.find({"_id": req.params.id}).remove().exec(function(err, data){
			if(err){
				console.log(err);
			}else{
				//console.log("success?");
				res.redirect("/saved");
			}
		});
	});
	//add new note to db
	app.post("/notes/:id", function(req, res){

		var newNote = new Note(req.body);
		var id = req.params.id;

		//console.log("app.post 'notes/:id : " + id);
		console.log("app.post newNote "+newNote);
		newNote.save(function(error, doc){
			if(error) {
				console.log(error);
			}else{
				//find the article to associate this note to
				Article.findOneAndUpdate({"_id": req.params.id}, {$push: {"notes": doc._id}}, {new: true})
				//execute the above query
				.exec(function(err, doc){
					if(err){
						console.log(err);
					}else{
						console.log(doc);
					}
				});
			}
		});
	});	

	app.get("/articles/notes/:id", function(req, res){
		//find the article associated with the id
		var id = req.params.id;
		//console.log("ApiRoutes: article ID: " +req.params.id);
		Article.findOne({"_id": id})
		//populate the notes associated with this Article
		.populate("notes")
		//execute the query and send back JSON containing the notes
		.exec(function(err, doc){
			if(err){
				console.log(err);
			}else{
				console.log(doc);
				res.json(doc);
			}
		});
	});

}