//More of a filler wishlist then anything
//This populates the wishlist modal with data


// check if wishlist exists
if (!localStorage.getItem('wishlist')) {
    var wishlistItems = [];
} else {
    var wishlistItems = JSON.parse(localStorage.getItem('wishlist'))
}

$('#openingWishlist').on('click', function (event) {
    let wishlistContent = $('#wishlistItems');
    event.preventDefault();
    $("#wishlistItems").empty();
    for (var i = 0; i < wishlistItems.length; i++) {
        console.log(wishlistItems[i]);
        // card related elements
        let gameCard = $('<div>');
        gameCard.addClass('card my-4');

        // card image related elements
        let gameImgDiv = $('<div>')
        let gameImgFigure = $('<figure>');
        let gameImage = $('<img>');
        gameImgDiv.addClass('card-image');
        gameImgFigure.addClass('image is-4by3');
        gameImage.attr('src', wishlistItems[i].gameImg);
        gameImgFigure.append(gameImage);
        gameImgDiv.append(gameImgFigure);

        // card title related elements
        // let gameMedia = $('<div>');
        // let mediaDiv = $('<div>');
        // let mediaContentDiv = $('<div>');
        // let gameTitle = $('<p>');
        // gameMedia.addClass('card-content');
        // mediaDiv.addClass('media is-centered');
        // mediaContentDiv.addClass('media-content');
        // gameTitle.text(wishlistItems[i].name);
        // gameTitle.addClass('is-centered');
        // mediaContentDiv.append(gameTitle);
        // mediaDiv.append(mediaContentDiv);
        // gameMedia.append(mediaDiv);

        let gameCardFooter = $('<footer>');
        gameCardFooter.addClass('card-footer');
        let gameTitle = $('<p>');
        gameTitle.addClass('is-centered card-footer-item');
        gameTitle.text(wishlistItems[i].name);
        gameTitle.prepend('<span class="has-text-weight-bold">Title: </span>');
        let lastPrice = $('<p>');
        lastPrice.addClass('is-centered card-footer-item');
        lastPrice.text('$' + wishlistItems[i].lastPrice);
        lastPrice.prepend('<span class="has-text-weight-bold">Last Deal: </span>');
        gameCardFooter.append(gameTitle, lastPrice);

        // card info related elements
        // let cardContent = $('<div>');
        // let gameDeal = $('<p>');
        // cardContent.addClass('content is-centered');
        // gameDeal.addClass('has-text-weight-bold');
        // gameDeal.text('Last Deal: $ ' + wishlistItems[i].lastPrice);
        // cardContent.append(gameDeal);
        gameCard.append(gameImgDiv, gameCardFooter);

        wishlistContent.append(gameCard);
    }
});

function wishlistGame (game) {
    wishlistItems.push(game);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
}