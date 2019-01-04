// On mouseover
$("path").on("mouseover touchend", function () {
  // Set comparison country ID to ID of hovered path
  app.comparisonCountryID = $(this).attr("id");
  // Store hovered country name and capital in variables
  const countryName = app.countryData[app.comparisonCountryID].name;
  const countryCapital = app.countryData[app.comparisonCountryID].capital;

  // Check whether user is hovering over their selected country
  if (app.comparisonCountryID !== app.userCountryID) {
    // Highlight country on map
    $(".country").removeClass("country--selected");
    $(this).addClass('country--selected');
    
    // Show country name, code, and capital city in div
    $(".country-name")
      .text(countryName)
      .css("font-size", "2.25rem");;
    $(".country-code").text(app.comparisonCountryID);
    $('.capital-city').text(`(${countryCapital})`);

    // Remove previous parameters
    $(`.parameter-num`).remove();
    $(`.parameter-perc`).remove();

    // Run function to display parameter values on DOM in map country data section
    app.displayParameterValues(app.comparisonCountryID, true);

    // Show country data (hover) div and all parameters
    $(".map__country-data").removeClass("no-display");
    $(".country-code").removeClass("no-display");
  }
});


$('body').on('click', function (e) {
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