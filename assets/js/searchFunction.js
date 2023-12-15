$(document).ready(function () {
    var searchBtn = document.getElementById('searchbtn');
    function searchFunction(event) {
        event.preventDefault();
        let searchBarValue = $('#searchbar').val().trim();
        $('#games-modal').addClass('is-active');

        // Check if the search bar is not empty
        if (searchBarValue !== "") {
            let searchHistory = getSearchHistory();
            let index = searchHistory.indexOf(searchBarValue)
            //removes item from history if it exists.
            if (index !== -1) {
                searchHistory.splice(index, 1);
            }

            searchHistory.unshift(searchBarValue);
            searchHistory = searchHistory.slice(0, 5);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    }

    //function to get the search History
    function getSearchHistory() {
        let searchHistory = localStorage.getItem('searchHistory');
        return searchHistory ? JSON.parse(searchHistory) : [];
    }

    //this will run the save function when you click the searchButton
    searchBtn.addEventListener("click", searchFunction);

    let searchContainer = $('#searchHistory');
    $("#searchbar").on("click", function (event) {
        searchContainer.empty();
        let data = getSearchHistory();

        //Goes through each recent history and displays them
        $.each(data, function (index, item) {
            let searchHistoryItem = $('<li>').text(item);
            //adds ids to the games, I don't know if I needed this but I already used it so didn't want to change it.
            searchHistoryItem.attr('id', 'searchedItemHistory')
            searchContainer.append(searchHistoryItem);
            //slight delay before showing list
            //it popped up isntantly so this looks cleaner
            setTimeout(function () {
                searchHistoryItem.click(function (event) {
                    event.stopPropagation();
                    $("#searchbar").val(item);
                });
            }, 75);
            //shows history
            searchContainer.show();
        });
    });

    //closes history tab
    $(document).click(function (event) {
        if (!$(event.target).closest('#searchbar', '#searchHistory', '#searchedItemHistory').length) {
            searchContainer.hide();
        }
    });


});