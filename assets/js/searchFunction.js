var searchBar = document.getElementById('searchbar');
var searchBtn = document.getElementById('searchbtn');

function searchFunction(event) {
    event.preventDefault();

    //Gets the current search history
    var searchHistory = getSearchHistory();
    //adds new searched item to history. Change (searchBar.value)
    //to whatver you want saved into history
    searchHistory.unshift(searchBar.value);
    //saves recent 5 searches. Change number for most recent
    searchHistory = searchHistory.slice(0, 5);
    //saves search History
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}
function getSearchHistory() {
    var searchHistory = localStorage.getItem('searchHistory');
    return searchHistory ? JSON.parse(searchHistory) : [];
}
// Event listener for search button click
searchBtn.addEventListener("click", searchFunction);

// Event listener for search bar click to show recent searches
searchBar.addEventListener("click", function() {
    showRecentSearches();
});

function showRecentSearches() {
    
}