// On mouseover
$("path").on("mouseover touchend", function () {
  // Show country data (hover) div and all parameters
  $(".map__country-data").removeClass("no-display");
  $(".country-code").removeClass("no-display");
  $(".parameter-value").removeClass("no-display");

  // Remove previous parameters
  $(`.parameter-num`).remove();
  $(`.parameter-perc`).remove();

  // Set comparison country ID to ID of hovered path
  app.comparisonCountryId = $(this).attr("id");
  // Store hovered country name and capital in variables
  const countryName = app.countryData[app.comparisonCountryId].name;
  const countryCapital = app.countryData[app.comparisonCountryId].capital;

  // Show country name, code, and capital city in div
  $(".country-name")
    .text(countryName)
    .css("font-size", "2.25rem");;
  $(".country-code").text(app.comparisonCountryId);
  $('.capital-city').text(`(${countryCapital})`);

  // Loop through all indicator objects
  app.indicatorObjects.forEach(function (item) {
    // Grab indicator ID from array
    const indicatorID = item.id;

    // Grab indicator tag from array
    const indicatorTag = item.tag;

    // Grab value of indicator for chosen country from app.countryData object
    let countryIndicatorVal = app.countryData[app.comparisonCountryId][indicatorID];

    // Initialize user country value
    let userCountryValue;

    
    // population 
    // population_fem
    // population_male
    // gdp
    // gdp-growth
    // life-expectancy
    // poverty
    // co2
    // education_ps
    // education_sec
    // education_prim
    // employment_fem
    // employment_male

    // Check if comparison country value is null or undefined, if yes, show "N/A", if no, round to nearest integer
    if (countryIndicatorVal == null || countryIndicatorVal == undefined) {
      countryIndicatorVal = "N/A";
      $(`.parameter-perc.${indicatorTag}`).addClass("no-display");
      userCountryValue = null; //should actually just hide this
    } else if (app.userCountryObject == undefined || app.userCountryObject == null) {
      // countryIndicatorVal = Math.round(countryIndicatorVal);
      countryIndicatorVal = countryIndicatorVal.toFixed(2);
      $(`.parameter-perc`).addClass('no-display');
      userCountryValue = null; //should actually just hide this
    } else {
      // countryIndicatorVal = Math.round(countryIndicatorVal);
      countryIndicatorVal = countryIndicatorVal.toFixed(2);
      userCountryValue = `${Math.round(((Math.abs(app.userCountryObject[indicatorID] - countryIndicatorVal)) / countryIndicatorVal) * 100)}%`;
      $(`.parameter-perc.${indicatorTag}`).css("color", "#a8a8a8");
    }

    if (userCountryValue == null || userCountryValue == NaN || userCountryValue == undefined) {
      userCountryValue = "N/A";
    }

    // If indicator tag is population-related, round to nearest million
    if (indicatorTag === 'population' || indicatorTag === 'population_fem' || indicatorTag === 'population_male'){
      countryIndicatorVal = `${(((countryIndicatorVal / 1000000) * 100) / 100).toFixed(3)}m`;
    } else if (indicatorTag === 'gdp' && countryIndicatorVal > 1000000000000) {
      countryIndicatorVal = `$${(((countryIndicatorVal / 1000000000000) * 100) / 100).toFixed(3)}t`;
    } else if (indicatorTag === 'gdp' && countryIndicatorVal > 1000000000) {
      countryIndicatorVal = `$${(((countryIndicatorVal / 1000000000) * 100) / 100).toFixed(3)}b`;
    } else if (indicatorTag === 'gdp'){
      countryIndicatorVal = `$${(((countryIndicatorVal / 1000000) * 100) / 100).toFixed(3)}m`;
    } else if (indicatorTag === 'gdp-growth') {
      countryIndicatorVal = `${countryIndicatorVal}%`;
    }

    // Find indicator location in DOM and fill with data
    const hoveredCountryHTML = `<span class="parameter-num ${indicatorTag}">${countryIndicatorVal}</span> <span class="parameter-perc ${indicatorTag}">${userCountryValue}</span>`;
    // $(`.parameter-num .${indicatorTag}`).text("");
    // $(`.parameter-value .${indicatorTag}`).empty();s

    $(`.parameter-value.${indicatorTag}`).append(hoveredCountryHTML);

  })
});


$('body').on('click', function (e) {
  // console.log(e.target.classList);
  if (e.target.classList.value === "button country-button" || e.target.classList.value === "settings-button button") {
    $(".country-name").text("Hover over a country for more info").css("font-size", "1.8rem");
    $(".country").removeClass("country--selected");
    $(".country-code").empty();
    $(".country-code").addClass("no-display");
    $(".capital-city").empty();
    $(".capital-city").addClass("no-display");
    $(".parameter-value").addClass("no-display");
  };
})