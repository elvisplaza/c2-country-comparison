
// this will search for the countryes based on the letters they type with the array input

app.mainMenuSearchBar = (wordToMatch, country) => {
    return country.filter(function (place) {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.capital.match(regex);
    });
}


// the function that takes the value from the input and maps throught and displays the found information. 
app.mapCountrySearch = function () {
    $('.country-input__map-page').on('keyup copy paste cut change', function () {
        
        // $(this).closest(".form__map-page").removeClass('no-display');
        const currentValue = $(this).val();
        app.searchResults = app.mainMenuSearchBar(currentValue, app.countryDataArray);
        // console.log(app.searchResults);
        const getData2 = new Promise(function (resolve, reject) {
            const html = app.searchResults.map(function (place) {
                return `<li class="country-list__item"><p>${place.name}</p></li>`;
            });
            resolve(html);
        })
        //determines if the li list will be empty or not. 
        getData2.then(function (array) {
            if ($('.country-input__map-page').val() !== "") {
                $('.country-list__map-page').empty().append(array.slice(0, 5));
                $(".country-list__map-page").removeClass("no-display");
            } else {
                $('.country-list__map-page').addClass("no-display");
            }
        })

    })
}

// app.userSelectedCountryId = 
//SUBMIT BUTTON FOR MAIN-MENU PLEASE ADD TO EVENT LISTENERS. 
app.submitCountryInput = function (e) {
    e.preventDefault();
    const value = $('.country-input__map-page').val();
    $("#country-list__map-page").css('z-index', '100');
    const searchResultsArray = app.searchResults.filter(function (country) {
        return value.toLowerCase() == country.name.toLowerCase()
    })
    // console.log("i work!")
    if (searchResultsArray.length >= 1) {
        app.userCountryID = searchResultsArray[0].geography.id
        app.userCountryObject = app.countryData[app.userCountryID];
        $(`#${app.userCountryID}`).addClass('country--highlight')
        app.displayChosenCountry();
    }
    $(this).closest('.modal').toggleClass('no-display');
}

$('.country-input__map-page').on('click', function () {
    $(`#${app.userCountryID}`).removeClass('country--highlight');
})

$('.form__map-page').on('submit', app.submitCountryInput);


$('.country-list__map-page').on('click', 'li', function (e) {
    const text = $('.country-input__map-page');
    clickedText = $(this).text();
    text.val(`${clickedText}`)
    app.submitCountryInput(e);
    $('.country-list__map-page').toggleClass('no-display');
    $(this).closest('.modal').toggleClass('no-display');
})