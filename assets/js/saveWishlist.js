//Very broad on what is being saved. This is just an outline
var saveWishList = document.documentElement('');

$('.saveBtn').children.on('click', function (event) {
    event.preventDefault();

    //gameDetails and //gameInfo will need to be changed depending on how div is set up.
    //We can grab the game name and or game details to save them.
    var gameDetails = $(this).parent().parent().find('.name').val();
    var gameInfo = $(this).parent().parent().attr('id');
    localStorage.setItem(gameInfo, JSON.stringify(gameDetails));
});
searchBtn.addEventListener("click", saveWishList);
