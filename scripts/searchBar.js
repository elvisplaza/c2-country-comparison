app = {};

// Search for country based on user input
app.searchFunction = (wordToMatch, country) => {
    return country.filter(function (place) {
    // Figure out if country or capital city matches searched term
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.capital.match(regex)
  });
}

// Take user input and run through country search function to show results list -- used in 2 locations so need 
app.countrySearch = function(searchInputID, resultsListClass) {
    // Pull value of input and store in variable
    const currentValue = $(searchInputID).val();
    // Create array of values returned from search function, using user input and country data array
    app.searchResults = app.searchFunction(currentValue, app.countryDataArray);
    // Map over array of matched results and return a list item for each
    const getData = new Promise(function (resolve, reject) {
        const html = app.searchResults.map(function (place) {
            return `<li class="country-list__item"><p>${place.name}</p></li>`;
        });
        resolve(html);
    })
    // Once list items have been populated
    getData.then(function (array) {
        // Check to make sure there is a value in the input
        if (array.length > 0) {
            // Show first three results in search results
            $(resultsListClass).empty().append(array.slice(0, 3));
            $(resultsListClass).removeClass("no-display");
        } else {
            // Hide search results
            $(resultsListClass).addClass("no-display");
        }
    })
}

// Country input submit
app.submitCountryInput = function (e, searchInputID, resultsListClass) {
    // Prevent default form submission action
    e.preventDefault();
    // Set value to search input value
    const value = $(searchInputID).val();

    // Find matching country name in search results array
    const searchResultsArray = app.searchResults.filter(function (country) {
        return value.toLowerCase() == country.name.toLowerCase()
    })
    
    // If there is a matching value, then:
    if (searchResultsArray.length === 1) {
        // Store user country ID
        app.userCountryID = searchResultsArray[0].geography.id
        // Find object matching country ID in country data dataset and store
        app.userCountryObject = app.countryData[app.userCountryID];
        // Add highlight to country on map
        $(`#${app.userCountryID}`).addClass('country--highlight');
        // Display chosen country
        app.displayChosenCountry();
    }
    // Hide modal
    // $(this).closest('.modal').toggleClass('no-display');
}

$('#country-input--map-page').on('click', function () {
    $(`#${app.userCountryID}`).removeClass('country--highlight');
})

// $('.country-form').on('submit', function(){
//     app.submitCountryInput(e, , );
// });


// $('.country-form').on('submit', function () {
//     app.submitCountryInput(e, , );
// });

// $('.country-form').on('submit', function () {
//     app.submitCountryInput(e, '', '');
// }


$('.country-list--main-page').on('click', 'li', function (e) {
    const text = $('#country-input--main-page');
    clickedText = $(this).text();
    text.val(`${clickedText}`)
    app.submitCountryInput(e, '#country-input--main-page', '.country-list--main-page');
    $('.country-list--main-page').toggleClass('no-display');
    $(this).closest('.modal').toggleClass('no-display');
})

// On click of list item on map page
$('.country-list--map-page').on('click', 'li', function (e) {
    // Store text in variable
    const text = $('#country-input--map-page');
    clickedText = $(this).text();
    text.val(`${clickedText}`)
    app.submitCountryInput(e, '#country-input--map-page', '.country-list--main-page');
    $('.country-list--map-page').toggleClass('no-display');
    $(this).closest('.modal').toggleClass('no-display');
})


