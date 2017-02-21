$('.search').on('click',function(){
  var isbnVar = $('.isbn-input').val();
  // alert(isbnVar);
  fetch(isbnVar);
});

$(document).ajaxStart(function(){
    $("#loadingimage").css("display", "block");
});

$(document).ajaxComplete(function(){
    $("#loadingimage").css("display", "none");
});

var fetch = function (isbnVar) {
  $("loadingimage").show();
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbnVar,
    dataType: "json",
    success: function(data) {
      $("#loadingimage").hide();
      //debugger;
      //console.log(data);
      var source = $("#book-template").html();
      var template = Handlebars.compile(source);
      var bookData = {
        title: data.items[0].volumeInfo.title,
        author: data.items[0].volumeInfo.authors[0],
        description: data.items[0].volumeInfo.description,
        imageURL: data.items[0].volumeInfo.imageLinks.thumbnail
      };

      $(".data-presentation").empty();
      var newHTML = template(bookData);
      $(".data-presentation").append(newHTML);

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};
