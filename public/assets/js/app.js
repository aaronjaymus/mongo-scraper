var mongoScraper = {
	
	saveButton: function(){
		var title = $(this).data("title");
		var url = $(this).data("url");

		$.ajax({
			method: "POST",
			url: "/articles/",
			data: {
				title: title,
				url: url
			}
		}).done(function(data){
			console.log(data);
		})
	}	
};


$(".save-button").on("click", function(){
	mongoScraper.saveButton();
})

$("#new-tab").on("click", function(){
	$("#saved-tab").removeClass("active");
	$("#new-tab").addClass("active");
});

$("#saved-tab").on("click", function(){
	$("#new-tab").removeClass("active");
	$("#saved-tab").addClass("active");
});	