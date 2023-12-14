//Change to whatever the variable is
var wishlistItems = ["Item 1", "Item 2", "Item 3"];
$('#wishlistBtn').on('click', function (event) {
    event.preventDefault();
    $("#wishlistContent").empty();
    for (var i = 0; i < wishlistItems.length; i++) {
        $("#wishlistContent").append("<p>" + wishlistItems[i] + "</p>");
    }
});