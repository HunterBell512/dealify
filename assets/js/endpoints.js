// function to get game deals from API CheapShark
async function getGameDeals (search) {
    let url = '';
    let gameData = '';

    // find if input was either a string or a number
    if (typeof search === 'string') {
        url = `https://www.cheapshark.com/api/1.0/games?title=${search}`
    } else if (typeof search === 'number') {
        url = `https://www.cheapshark.com/api/1.0/games?ids=${search}`;
    }

    // fetch for data
    const res = await fetch(url);
    gameData = await res.json();

    // log the response
    console.log(gameData);
    return gameData;
}