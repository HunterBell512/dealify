var selectedGame = {                // Object to store data for wishlist
    name: "",
    lastPrice: "",
    store: "",
    storeId: ""
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
        mediaContentDiv.append(gameTitle);
        mediaDiv.append(mediaContentDiv);
        gameMedia.append(mediaDiv);

        // card info related elements
        let cardContent = $('<div>');
        let gameDeal = $('<p>');
        cardContent.addClass('content columns');
        gameDeal.addClass('column');
        gameDeal.text(element.cheapest);
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
async function getGameInfo (name) {
    let key = '88c319ac8d934bfc9278191a57ae1fe4';                                               // API KEY for RAWG
    let gameName = name.replaceAll(/[-+.^:,]/g, '');                                            // Name of searched game with character removed
    let url = `https://api.rawg.io/api/games/${gameName.replaceAll(' ', '-')}?key=${key}`;      // Parsed URL to use in fetch
    let gameData = '';                                                                          // Var to store fetch results
    let imgData = '';

    // fetch for data
    const gameRes = await fetch(url);
    gameData = await gameRes.json();

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
        gameCard.addClass('card column is-4');
        
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
        let priceInfoDiv = $('<div>');
        let priceInfoImg = $('<img>');
        gameMedia.addClass('card-content');
        mediaDiv.addClass('columns media');
        gameInfoDiv.addClass('column media-content');
        gameTitle.text(gameData.name);
        gameRelease.text(dayjs(gameData.released).format('MMM D, YYYY'));
        gameInfoDiv.addClass('column is-6');
        gameInfoDiv.append(gameTitle, gameRelease);
        priceInfoDiv.addClass('column is-3');
        priceInfoImg.attr('src', `https://www.cheapshark.com${imgData[selectedGame.storeID - 1].images.logo}`);
        priceInfoImg.css({"height": "60", "width": "60"});
        priceInfoDiv.append(priceInfoImg);
        mediaDiv.append(gameInfoDiv, priceInfoDiv);
        gameMedia.append(mediaDiv);
        
        // card info related elements
        let gameDescDiv = $('<div>');
        let gameDesc = new DOMParser().parseFromString(gameData.description, 'text/html');
        console.log(gameDesc.body);
        gameDescDiv.addClass('column');
        // gameDesc.addClass('container column is-8');
        // gameDesc.text(gameData.description);
        gameDescDiv.append(gameDesc.body);

        gameCard.append(gameImgDiv, gameMedia);
        searchedGamesContainer.append(gameCard, gameDescDiv);
    }
    
    console.log(gameData);
    return gameData;
}

async function getGameByID (id) {
    let url = `https://www.cheapshark.com/api/1.0/games?id=${id}`;

    // fetch for data
    const res = await fetch(url);
    const gameData = await res.json();

    selectedGame.name = gameData.info.title;
    selectedGame.lastPrice = gameData.deals[0].price;
    selectedGame.store = storeIDs[gameData.deals[0].storeID];
    selectedGame.storeID = gameData.deals[0].storeID;
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