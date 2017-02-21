$('.isbn-search').on('click',function(){
  var isbnVar = $('.isbn-input').val();
  // alert(isbnVar);
  fetch(isbnVar);
});

var fetch = function (isbnVar) {
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbnVar,
    dataType: "json",
    success: function(data) {
      //debugger;
      //console.log(data);
      var source = $("#book-template").html();
      var template = Handlebars.compile(source);
/*original format (w/out Handlebars)
      var bookTitle = data.items[0].volumeInfo.title;
      var bookAuthor = data.items[0].volumeInfo.authors[0];
      var bookDescription = data.items[0].volumeInfo.description;
      var bookImageURL = data.items[0].volumeInfo.imageLinks.thumbnail; */
      // console.log(bookTitle + " " + bookAuthor + " " + bookDescription + " " + bookImageURL);
      var bookData = {
        title: data.items[0].volumeInfo.title,
        author: data.items[0].volumeInfo.authors[0],
        description: data.items[0].volumeInfo.description,
        imageURL: data.items[0].volumeInfo.imageLinks.thumbnail
      };

      $(".data-presentation").empty();
      // $(".data-presentation").append("<h1>" + bookTitle + "</h1> <h3>Written by: " + bookAuthor + "</h3> <p>" + bookDescription + "</p> <img src=" + bookImageURL + "/>");
      var newHTML = template(bookData);
      $(".data-presentation").append(newHTML);

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};
