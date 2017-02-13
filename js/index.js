//Allow user to trigger the onClick function by using the "Enter" key.
document.getElementById("searchBox").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("submit").click();
    }
});

//Define the onClick function.
function search() {
  
  // Retrieve user input from the search box.
  var rawInput = document.getElementById("userInput");
  var finalInput = rawInput.value;

  // Replace all whitespace with "+" so it is compatible for the API address.
  var searchQuery = finalInput.replace(/\s/g, "+");

  // Insert the search query into the API address and GET the JSON file.
  $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + (searchQuery) + "&namespace=0&limit=10&origin=*", function(response) {

    //Retrieve and allocate the data from the JSON file to their respective places in the modified HTML.
    for (var i = 0; i < 10; i++) {

      if (response[1][0] === undefined) {
        $(".article0").html("<h2>No Results...</h2>");
        $(".article" +(1+i)).html("");
      } else if (response[1][i] === undefined) {
        $(".article" + (i)).html("");
      } else {
        
        //Send the search box up to the top of the page.
        document.getElementById("searchBox").style.marginTop="20px";
        
        $(".article" + (i)).html("<h2><a href='" + response[3][i] + "' target='blank'>" + response[1][i] + "</a></h2><blockquote><p>" + response[2][i] + "</p><footer><a href='" + response[3][i] + "' target='blank'>" + response[3][i] + "</a></footer></blockquote>");
      }
    }
  })
  
  //Show the loaded data on the page.
  $("#content").show();
  
}