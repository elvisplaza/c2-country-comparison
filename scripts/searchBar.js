app = {};

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

// On click of any list item in dropdown menu on main page, change user country
$('.country-list--main-page').on('click touchend', 'li', function () {
    // Store "this" of clicked li in variable
    const clickedCountry = this;
    // Run function to change user country to clicked value and display in input field
    app.changeUserCountry(clickedCountry, '#country-input--main-page');
    // Hide search list modal
    $('.country-list--main-page').toggleClass('no-display');
})

// On click of any list item in dropdown menu on map page, change user country
$('.country-list--map-page').on('click touchend', 'li', function () {
    // Store "this" of clicked li in variable
    const clickedCountry = this;
    // Run function to change user country to clicked value and display in input field
    app.changeUserCountry(clickedCountry, '#country-input--map-page');
    // Hide search list modal
    $('.country-list--map-page').toggleClass('no-display');
})

// app.submitCountryInput(e, '#country-input--main-page', '.country-list--main-page');
// $(this).closest('.modal').toggleClass('no-display');
// Change this to be on submit
// $('#country-input--map-page').on('click', function () {
//     $(`#${app.userCountryID}`).removeClass('country--highlight');
// })

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
        app.displayChosenCountry();
    } else {
        // Alert the user that their country is invalid
        alert('Invalid country. Please try again.');
    }
    // Hide modal
    $(thisRef).closest('.modal').toggleClass('no-display');
}

$('.country-form--main-page').on('submit', function(e){
    // Prevent default form submission action
    e.preventDefault();
    const self = this;
    app.submitCountryInput('#country-input--main-page', self);
});

$('.country-form--map-page').on('submit', function(e){
    console.log('map page submitted');
    // Prevent default form submission action
    e.preventDefault();
    const self = this;
    app.submitCountryInput('#country-input--map-page', self);
});


// Function to show chosen country
app.displayChosenCountry = function () {
    $(".parameter-value-sc").removeClass("no-display");

    $(`.parameter-num-sc`).remove();

    const countryName = app.countryData[app.userCountryID].name;
    const countryCapital = app.countryData[app.userCountryID].capital;

    $(".main-menu__country .button").text(`${countryName} (${app.userCountryID})`);
    $('.chosen-capital-city').text(`Capital: ${countryCapital}`);

    app.indicatorObjects.forEach(function (item) {
        // Grab indicator ID from array
        const indicatorID = item.id;

        // Grab indicator tag from array
        const indicatorTag = item.tag;

        // Grab value of indicator for chosen country from app.countryData object
        let scCountryIndicatorVal = app.countryData[app.userCountryID][indicatorID];

        // Check if value is null or undefined, if yes, show "N/A", if no, round to nearest integer
        if (app.userCountryID == undefined || app.userCountryID == null) {
            $(".main-menu__chosen-country").addClass("no-display");
        }

        if (scCountryIndicatorVal == null || scCountryIndicatorVal == undefined) {
            // $(".main-menu__chosen-country").removeClass("no-display");
            scCountryIndicatorVal = "N/A";
        }

        // Find indicator location in DOM and fill with data
        const scCountryHTML = `<span class="parameter-num-sc ${indicatorTag}">${scCountryIndicatorVal}</span>`;

        $(`.parameter-value-sc.${indicatorTag}`).append(scCountryHTML);

    })
}