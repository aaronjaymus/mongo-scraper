//app js for mongo scraper. contains methods for adding and deleting articles to and from db.
var mongoScraper = {
	//save an article from the new tab into the db
	saveButton: function(button){
		var title = $(button).data("title");
		var url = $(button).data("url");
		console.log("App.js title: "+title);
		console.log("App.js url: "+url);

		$.ajax({
			method: "POST",
			url: "/articles/",
			data: {
				title: title,
				url: url
			}
		}).done(function(data){
			console.log(data);
		});
	},
	//delete and article from the saved db
	deleteArticleButton: function(button){
		var id = $(button).data("id");
		var url = "/articles/delete/" +id;
		console.log("deleteButton id " +url);

		$.ajax({
			method: "POST",
			url: url
		}).done(function(data){
			//console.log(data);
			$(button).closest(".row").remove();
		});
	},

	openNotesButton: function(button){
		var id = $(button).data("id");
		var url = "/articles/notes/" + id;
		console.log(url);
		$.ajax({
			method: "GET",
			url: url
		}).done(function(data){
			console.log(data.notes);
			$("#save-note-button").data("id", id);
			//send JSON data to Modal
			for(var i=0; i<data.notes.length; i++){
				
				var noteDiv = $("<div>");
				noteDiv.html("<p>Title: "+data.notes[i].title+"</p>"+
					"<p>Body: "+data.notes[i].body+"</p>");
				var noteButton = $("<button>");
				noteButton.data("id", id).addClass("button btn-primary float-right");
				noteDiv.append(noteButton);
				$("#notes-view").append(noteDiv);
			}
		});
	},

	saveNotesButton: function(button){
		console.log(button);
		var id = $(button).data("id");
		var url = "/notes/"+id;
		var title = $("#note-title").val();
		var body = $("#note-body").val();
		
		$.ajax({
			method: "POST",
			url: url,
			data: {
				title: title,
				body: body
			}
		}).done(function(data){
			console.log(data);
		});
	},

	deleteNoteButton: function(button){

	}
};


$(".save-button").on("click", function(){
	mongoScraper.saveButton(this);
});

$(".delete-article-button").on("click", function(){
	mongoScraper.deleteArticleButton(this);
});

$(".open-notes-button").on("click", function(){
	mongoScraper.openNotesButton(this);
});

$("#save-note-button").on("click", function(){
	console.log(this);
	mongoScraper.saveNotesButton(this);
});

//these changes the active tab to New or Saved based on clicks. Happens before handlebars is rendered, handlebars does the same thing.
$("#new-tab").on("click", function(){
	$("#saved-tab").removeClass("active");
	$("#new-tab").addClass("active");
});

$("#saved-tab").on("click", function(){
	$("#new-tab").removeClass("active");
	$("#saved-tab").addClass("active");
});	