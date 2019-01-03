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

  // Run function to display parameter values on DOM in map country data section
  app.displayParameterValues('.map__country-data', app.comparisonCountryId, true);
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