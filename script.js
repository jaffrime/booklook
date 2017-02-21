$('.search').on('click',function(){
  var searchData = {
    searchVal: $(this).closest('div').find('input').val(),
    searchType: $(this).closest('div').find('input').data().search
  }
  // console.log(searchData);
  fetch(searchData);
});

$(document).ajaxStart(function(){
    $("#loadingimage").css("display", "block");
});

$(document).ajaxComplete(function(){
    $("#loadingimage").css("display", "none");
});

var fetch = function (searchData) {
  var urlVal;

  switch (searchData.searchType) {
    case "isbn":
      urlVal = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + searchData.searchVal;
      break;

    case "title":
      urlVal = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + searchData.searchVal;
      break;

    case "author":
      urlVal = "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + searchData.searchVal;
      break;

    default:
  }

  $("loadingimage").show();
  $.ajax({
    method: "GET",
    url: urlVal,
    dataType: "json",
    success: function(data) {
      $("#loadingimage").hide();
      // debugger;
      // console.log(data);
      if (data.totalItems > 1) {
      //  displayOptions(data);
        var source = $("#options-template").html();
        var template = Handlebars.compile(source);
        var bookOptions = {
          list: [
            //{title: , author: }
          ]
        };
        // console.log(data.items[0].volumeInfo.title);
        // console.log(data.items[0].volumeInfo.authors[0]);
        // bookOptions.list.push({title: data.items[0].volumeInfo.title, author: data.items[0].volumeInfo.authors[0]});
        // console.log(data.items[1].volumeInfo.title);
        // console.log(data.items[1].volumeInfo.authors[0]);
        // bookOptions.list.push({title: data.items[1].volumeInfo.title, author: data.items[1].volumeInfo.authors[0]});
        // console.log(data.items[2].volumeInfo.title);
        // console.log(data.items[2].volumeInfo.authors[0]);
        // bookOptions.list.push({title: data.items[2].volumeInfo.title, author: data.items[2].volumeInfo.authors[0]});


        for (i=0; i<data.items; i++) {
          console.log(data.items[i].volumeInfo.title);
          console.log(data.items[i].volumeInfo.authors[0]);
          bookOptions.list.push({title: data.items[i].volumeInfo.title, author: data.items[i].volumeInfo.authors[0]});
        }
        console.log(bookOptions);
        $(".data-presentation").empty();
        var newHTML = template(bookOptions);
        $(".data-presentation").append(newHTML);

      } else {
      //  displayBook(data);
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

      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var displayBook = function (data) {


};

var displayOptions = function (data) {

};
