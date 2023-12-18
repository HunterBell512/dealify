let searchedGame = {                // Object to store data for wishlist
    name: "",
    lastPrice: "",
    store: "",
    storeId: "",
    gameImg: ""
};
let cardContainer = $('<div>');
let gamesModal = $('#games-modal-content');
let searchedGamesContainer = $("#searched-games");

// function to get game deals from API CheapShark
async function getGameDeals (search) {
    let url = '';
    let gameData = '';
    cardContainer.empty();
    cardContainer.addClass('columns is-flex-wrap-wrap');

    // find if input was either a string or a number
    if (typeof search === 'string') {
        url = `https://www.cheapshark.com/api/1.0/games?title=${search}`
    } else if (typeof search === 'number') {
        url = `https://www.cheapshark.com/api/1.0/games?id=${search}`;
    }

    // fetch for data
    const res = await fetch(url);
    gameData = await res.json();

    gameData.forEach(element => {

        // card related elements
        let gameCard = $('<div>');
        gameCard.addClass('card column is-4');
        gameCard.css('cursor', 'pointer');

        // card image related elements
        let gameImgDiv = $('<div>')
        let gameImgFigure = $('<figure>');
        let gameImage = $('<img>');
        gameImgDiv.addClass('card-image');
        gameImgFigure.addClass('image is-4by3');
        gameImage.attr('src', element.thumb);
        gameImgFigure.append(gameImage);
        gameImgDiv.append(gameImgFigure);

        // card title related elements
        let gameMedia = $('<div>');
        let mediaDiv = $('<div>');
        let mediaContentDiv = $('<div>');
        let gameTitle = $('<p>');
        gameMedia.addClass('card-content');
        mediaDiv.addClass('media');
        mediaContentDiv.addClass('media-content');
        gameTitle.text(element.external);
        gameTitle.addClass('is-centered');
        mediaContentDiv.append(gameTitle);
        mediaDiv.append(mediaContentDiv);
        gameMedia.append(mediaDiv);

        // card info related elements
        let cardContent = $('<div>');
        let gameDeal = $('<p>');
        cardContent.addClass('content is-centered');
        gameDeal.addClass('has-text-weight-bold');
        gameDeal.text('Current Deal: $' + element.cheapest);
        cardContent.append(gameDeal);

        gameCard.data('name', element.external);
        gameCard.data('gameID', element.gameID);
        gameCard.append(gameImgDiv, gameMedia, cardContent);
        gameCard.on('click', SelectGame);
        cardContainer.append(gameCard);
    });
    gamesModal.append(cardContainer);


    // log the response
    console.log(gameData);
    return gameData;
}

// function to get game information from API RAWG
async function getGameInfo (name, id) {
    let key = '88c319ac8d934bfc9278191a57ae1fe4';                                               // API KEY for RAWG
    let gameName = name.replaceAll(/[-+.^:,]/g, '');                                            // Name of searched game with character removed
    let url = `https://api.rawg.io/api/games/${gameName.replaceAll(' ', '-')}?key=${key}`;      // Parsed URL to use in fetch
    let gameData = '';                                                                          // Var to store fetch results
    let imgData = '';
    let scoreData = '';

    // fetch for data
    const gameRes = await fetch(url);
    gameData = await gameRes.json();

    const storeRes = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${id}`);
    storeData = await storeRes.json();
    console.log(storeData);

    const imgRes = await fetch('https://www.cheapshark.com/api/1.0/stores');
    imgData = await imgRes.json();
    
    // log the response
    if (gameRes.status === 404) {
        console.log("We couldn't find anymore info on this game...");
    } else {
        searchedGamesContainer.empty();
        $('#games-modal').removeClass('is-active');
        
        // card related elements
        let gameCard = $('<div>');
        gameCard.addClass('card column is-4-desktop');
        
        // Game Card info
        let gameImgDiv = $('<div>')
        let gameImgFigure = $('<figure>');
        let gameImage = $('<img>');
        gameImgDiv.addClass('card-image');
        gameImgFigure.addClass('image is-4by3');
        gameImage.attr('src', gameData.background_image);
        gameImgFigure.append(gameImage);
        gameImgDiv.append(gameImgFigure);
        
        let gameMedia = $('<div>');
        let mediaDiv = $('<div>');
        let gameInfoDiv = $('<div>');
        let gameTitle = $('<p>');
        let gameRelease = $('<p>');
        let metaScore = $('<p>');
        let retail = $('<p>');
        let price = $('<p>');
        let store = $('<p>');
        let storeImgDiv = $('<div>');
        let storeImg = $('<img>');
        gameMedia.addClass('card-content');
        mediaDiv.addClass('columns media');
        gameInfoDiv.addClass('column media-content');
        gameTitle.text(gameData.name);
        gameTitle.prepend('<span class="has-text-weight-bold">Title: </span>');
        gameRelease.text(dayjs(gameData.released).format('MMM D, YYYY'));
        gameRelease.prepend('<span class="has-text-weight-bold">Release: </span>');
        metaScore.text(gameData.metacritic);
        metaScore.prepend('<span class="has-text-weight-bold">Meta Score: </span>');
        retail.text(storeData.deals[0].retailPrice);
        retail.prepend('<span class="has-text-weight-bold">Retail Price: </span>');
        price.text(`${storeData.deals[0].price} (-${Math.floor(storeData.deals[0].savings)}%)`);
        price.prepend('<span class="has-text-weight-bold">Best Deal: </span>');
        store.text(storeIDs[storeData.deals[0].storeID]);
        store.prepend('<span class="has-text-weight-bold">Store: </span>');
        gameInfoDiv.addClass('column is-8-desktop is-8-mobile');
        gameInfoDiv.append(gameTitle, gameRelease, metaScore, retail, price, store);
        storeImgDiv.addClass('column is-4-desktop is-4-mobile');
        storeImg.attr('src', `https://www.cheapshark.com${imgData[searchedGame.storeID - 1].images.logo}`);
        storeImg.css({"height": "100", "width": "100"});
        storeImgDiv.append(storeImg);
        mediaDiv.append(gameInfoDiv, storeImgDiv);
        gameMedia.append(mediaDiv);
        
        // card info related elements
        let gameDescDiv = $('<div>');
        let gameDesc = new DOMParser().parseFromString(gameData.description, 'text/html');
        console.log(gameDesc.body);
        gameDescDiv.addClass('column is-8-desktop is-12-tablet is-12-mobile');
        // gameDesc.addClass('container column is-8');
        // gameDesc.text(gameData.description);
        gameDescDiv.append(gameDesc.body);

        let gameCardFooter = $('<footer>');
        gameCardFooter.addClass('card-footer');
        let wishlistButton = $('<button>');
        wishlistButton.addClass('button card-footer-item');
        wishlistButton.text('Add to Wishlist')
        wishlistButton.on('click', function () {
            let selectedGame = Object.assign({}, searchedGame);
            wishlistGame(selectedGame);
        });
        gameCardFooter.append(wishlistButton);

        gameCard.append(gameImgDiv, gameMedia, gameCardFooter);
        searchedGamesContainer.append(gameCard, gameDescDiv);
        searchedGame.gameImg = gameData.background_image;
    }
    
    console.log(gameData);
    return gameData;
}

async function getGameByID (id) {
    let url = `https://www.cheapshark.com/api/1.0/games?id=${id}`;

    // fetch for data
    const res = await fetch(url);
    const gameData = await res.json();

    searchedGame.name = gameData.info.title;
    searchedGame.lastPrice = gameData.deals[0].price;
    searchedGame.store = storeIDs[gameData.deals[0].storeID];
    searchedGame.storeID = gameData.deals[0].storeID;
}

function SelectGame () {
    getGameByID($(this).data('gameID'));
    getGameInfo($(this).data('name'), $(this).data('gameID'));
}
//This only saves title. Need entire api to be saved but this works.
$('#searchbtn').click(function(){
    var searchValue = $('#searchbar').val();
    if(searchValue.trim()=== ""){
        console.log('empty');
    } else{
        getGameDeals(searchValue);
    }
});