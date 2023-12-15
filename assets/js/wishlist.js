//More of a filler wishlist then anything
//This populates the wishlist modal with data


//filler data
var wishlistItems = ["Game 1", "Game 2", "Game 3"];
$('#openingWishlist').on('click', function (event) {
    event.preventDefault();
    $("#wishlistItems").empty();
    for (var i = 0; i < wishlistItems.length; i++) {
        let wishItems = $('<li>').text(wishlistItems[i]);
        wishItems.attr('id', 'liWishItems')
        $('#wishlistItems').append(wishItems);
    }
});