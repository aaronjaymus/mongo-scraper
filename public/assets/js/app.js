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
	deleteButton: function(button){
		var id = $(button).data("id");
		var url = "/articles/delete/" + id;
		console.log("deleteButton id " +url);

		$.ajax({
			method: "POST",
			url: url
		}).done(function(data){
			//console.log(data);
			$(button).closest(".row").remove();
		});
	}	
};


$(".save-button").on("click", function(){
	mongoScraper.saveButton(this);
});

$(".delete-button").on("click", function(){
	mongoScraper.deleteButton(this);
})

$("#new-tab").on("click", function(){
	$("#saved-tab").removeClass("active");
	$("#new-tab").addClass("active");
});

$("#saved-tab").on("click", function(){
	$("#new-tab").removeClass("active");
	$("#saved-tab").addClass("active");
});	