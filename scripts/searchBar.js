// Search for country based on user input
app.searchFunction = (wordToMatch, country) => {
    return country.filter(function (place) {
    // Figure out if country or capital city matches searched term
    const regex = new RegExp(wordToMatch, 'gi');
    // return place.name.match(regex) || place.capital.match(regex)
    return place.name.match(regex)
  });
}

// Take user input and run through country search function to show results list
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

// Method to change user country
app.changeUserCountry = (clickedLi, inputID) => {
    // Store country input in variable
    const countryInput = $(inputID);
    // Store text value of selected country
    selectedCountry = $(clickedLi).text();
    // Update input to display text value of selected country
    countryInput.val(`${selectedCountry}`);
}

// Country input submit
app.submitCountryInput = function (searchInputID, thisRef) {
    // Set value to search input value
    const value = $(searchInputID).val();

    // Find matching country name in search results array
    const searchResultsArray = app.searchResults.filter(function (country) {
        return value.toLowerCase() == country.name.toLowerCase()
    })
    console.log(searchResultsArray);
    // If there is a matching value, then:
    if (searchResultsArray.length === 1) {
        // Store user country ID
        app.userCountryID = searchResultsArray[0].geography.id
        // Find object matching country ID in country data dataset and store
        app.userCountryObject = app.countryData[app.userCountryID];
        // Add highlight to country on map
        $('path').removeClass('country--highlight');
        $(`#${app.userCountryID}`).addClass('country--highlight');

        // Display chosen country

        // Show parameter value names
        $(".parameter-value--secondary").removeClass("no-display");
        // Clear any pre-existing parameters from page
        $(`.parameter-num--secondary`).remove();

        // Store country name and capital from global namespace in variable
        const countryName = app.countryData[app.userCountryID].name;
        const countryCapital = app.countryData[app.userCountryID].capital;

        // Display country name and ID in country button on map page
        $(".main-menu__country .button").text(`${countryName} (${app.userCountryID})`);
        // Display capital city in modal
        $('.chosen-capital-city').text(`Capital: ${countryCapital}`);

        // Run function to display parameter values on DOM in chosen country data section
        app.displayParameterValues(app.userCountryID, false);

        // Hide modal
        $(thisRef).closest('.modal').toggleClass('no-display');
    } else {
        // Alert the user that their country is invalid
        alert('Invalid country. Please try again.');
    }
    
}