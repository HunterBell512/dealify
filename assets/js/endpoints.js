var selectedGame = {                // Object to store data for wishlist
    name: "",
    lastPrice: "",
    store: ""
};
let cardContainer = $('<div>');

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
    $('#search-results').append(cardContainer);

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

    // fetch for data
    const res = await fetch(url);
    gameData = await res.json();
    
    // log the response
    if (res.status === 404) {
        console.log("We couldn't find anymore info on this game...");
    } else {
        cardContainer.empty();
        
        // card related elements
        let gameCard = $('<div>');
        gameCard.addClass('card column is-4');
        
        // Came Card info
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
        let mediaContentDiv = $('<div>');
        let gameTitle = $('<p>');
        let gameRelease = $('<p>');
        gameMedia.addClass('card-content');
        mediaDiv.addClass('media');
        mediaContentDiv.addClass('media-content');
        gameTitle.text(gameData.name);
        gameRelease.text(dayjs(gameData.released).format('MMM D, YYYY'));
        mediaContentDiv.append(gameTitle, gameRelease);
        mediaDiv.append(mediaContentDiv);
        gameMedia.append(mediaDiv);
        
        // card info related elements
        let gameDescDiv = $('<div>');
        let gameDesc = $('<p>');
        gameDescDiv.addClass('columns');
        gameDesc.addClass('container column is-8');
        gameDesc.text(gameData.description);
        gameDescDiv.append(gameDesc);

        gameCard.append(gameImgDiv, gameMedia);
        cardContainer.append(gameCard, gameDesc);
    }
    
    console.log(gameData);
    return gameData;
}

async function getGameByID (id) {
    let url = `https://www.cheapshark.com/api/1.0/games?id=${id}`;

    // fetch for data
    const res = await fetch(url);
    const gameData = await res.json();

    selectedGame.name = gameData.title;
    selectedGame.lastPrice = gameData.deals[0].price;
    selectedGame.store = storeIDs[gameData.deals[0].storeID];

    console.log(selectedGame)
}

function SelectGame () {
    getGameByID($(this).data('gameID'));
    getGameInfo($(this).data('name'));
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