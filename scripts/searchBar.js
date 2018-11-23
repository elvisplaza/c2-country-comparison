
app.searchBar = function(wordToMatch, country){

    return  this.country.filter(place =>{
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.capital.match(regex);
    });
}

app.displayMatches = function(){
    console.log(this.value)
}

const searchInput = document