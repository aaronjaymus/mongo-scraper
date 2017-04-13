var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	url: {
		type: String,
		unique: true,
		required: true
	},
	notes: [{
		type: Schema.Types.ObjectId,
		ref: "Note"
	}]
});

//checks that there are no dublicate entries in the collection for articles.
ArticleSchema.plugin(uniqueValidator);

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;