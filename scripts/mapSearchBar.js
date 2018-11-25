
// this will search for the countryes based on the letters they type with the array input

app.mainMenuSearchBar = (wordToMatch, country) => {
    return country.filter(function (place) {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex)|| place.capital.match(regex);
    });
}


// the function that takes the value from the input and maps throught and displays the found information. 
app.mapCountrySearch = function() {
    $('#country-input-2').on('keyup copy paste cut change', function() {
        const currentValue = $(this).val();
        app.searchResults = app.mainMenuSearchBar(currentValue, app.countryDataArray);
        console.log(app.searchResults)
        const getData2 = new Promise(function (resolve, reject) {
            const html2 = app.searchResults.map(function (place) {
                return `<li class="country-list__item"><p>${place.name}</p></li>`;
            });
            resolve(html2);
        })
        //determines if the li list will be empty or not. 
        getData2.then(function (array) {
            if ($('#country-input-2').val() !== "") {
                $('#country-list-2').empty().append(array.slice(0, 5));
                $('#country-list-2').removeClass("no-display");
            } else {
                $('#country-list-2').addClass("no-display");
            }
        })
    });
}








