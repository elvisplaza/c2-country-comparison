
// this will search for the countryes based on the letters they type with the array input

app.searchBar = (wordToMatch, country) => {
    return country.filter(function (place) {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.capital.match(regex)
    });
}

// the function that takes the value from the input and maps throught and displays the found information. 
app.countrySearch = function() {
    $('#country-input').on('click change keyup copy paste cut', function () {
        const currentVal = $(this).val();
        const matchArray = app.searchBar(currentVal, app.countryDataArray);
        console.log
        const getData = new Promise(function (resolve, reject) {
            const html = matchArray.map(function (place) {
                return `<li class="country-list__item"><p>${place.name} - ${place.capital} </p></li>`;
            });
            resolve(html);
        })
        //determines if the li list will be empty or not.
        getData.then(function (array) {
            if ($('#country-input').val() !== "") {
                $('#country-list').empty().append(array.slice(0, 5));
                $('#country-list').removeClass("no-display");
            } else {
                $('#country-list').addClass("no-display");
            }
        })
    });
}


