var searchBar = document.getElementById('searchbar');
var searchBtn = document.getElementById('searchbtn');

function searchFunction(event){
    event.preventDefault();

    //searchBar.value === what is typed.
    //gives value of what is searched
    console.log(searchBar.value);

    //Gets the current search history
    var searchHistory = getSearchHistory();
    //adds new searched item to history. Change (searchBar.value) 
    //to whatver you want saved into history
    searchHistory.unshift(searchBar.value);
    //saves recent 5 searches. Change number for most recent
    searchHistory = searchHistory.slice(0,5);
    //saves search History
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
}
function getSearchHistory(){
    var searchHistory = localStorage.getItem('searchHistory');
    return searchHistory ? JSON.parse(searchHistory) : [];
}
searchBtn.addEventListener("click", searchFunction);
