$("path").on("mouseover", function () {
  // $(this).addClass('country-map--highlight');
  $(".map__country-data").removeClass("no-display");
  $(".country-code").removeClass("no-display");
  $(".parameter-value").removeClass("no-display");

  $(`.parameter-num`).remove();
  $(`.parameter-perc`).remove();

  app.comparisonCountryId = $(this).attr("id");
  console.log(app.countryData[app.comparisonCountryId]);
  const countryName = app.countryData[app.comparisonCountryId].name;
  const countryCapital = app.countryData[app.comparisonCountryId].capital;
  // console.log(countryCapital);
  $(".country-name")
    .text(countryName)
    .css("font-size", "2.25rem");;
  $(".country-code").text(app.comparisonCountryId);
  $('.capital-city').text(`(${countryCapital})`);
  app.indicatorObjects.forEach(function (item) {
    // Grab indicator ID from array
    const indicatorID = item.id;

    // Grab indicator tag from array
    const indicatorTag = item.tag;


    // Grab value of indicator for chosen country from app.countryData object
    let countryIndicatorVal = app.countryData[app.comparisonCountryId][indicatorID];

    let userCountryValue;

    // Check if value is null or undefined, if yes, show "N/A", if no, round to nearest integer
    if (countryIndicatorVal == null || countryIndicatorVal == undefined) {
      countryIndicatorVal = "N/A";
      $(`.parameter-perc.${indicatorTag}`).addClass("no-display");
      // userCountryValue = "N/A"; //should actually just hide this
      
    } else if (app.userCountryObject == undefined || app.userCountryObject == null) {
      countryIndicatorVal = Math.round(countryIndicatorVal);
      $(`.parameter-perc.${indicatorTag}`).addClass('no-display');
      // userCountryValue = "N/A"; //should actually just hide this
      
    } else if (userCountryValue > 0) {
      countryIndicatorVal = Math.round(countryIndicatorVal);
      userCountryValue = `${Math.round(((app.userCountryObject[indicatorID] - countryIndicatorVal) / countryIndicatorVal) * 100)}%`;
      $(`.parameter-perc.${indicatorTag}`).css("color", "#66bf68");
      // userCountryValue = countryIndicatorVal / userCountryValue;
    } else if (userCountryValue <= 0) {
      countryIndicatorVal = Math.round(countryIndicatorVal);
      userCountryValue = `${Math.round(((app.userCountryObject[indicatorID] - countryIndicatorVal) / countryIndicatorVal) * 100)}%`;
      $(`.parameter-perc.${indicatorTag}`).css("color", "#ed6562");
    } else {
      countryIndicatorVal = Math.round(countryIndicatorVal);
      userCountryValue = Math.round(((app.userCountryObject[indicatorID] - countryIndicatorVal) / countryIndicatorVal) * 100);
      $(`.parameter-perc.${indicatorTag}`).css("color", "#a8a8a8");
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
  if (e.target.classList.value === "button country-button" || e.target.classList.value === "button country-button" || e.target.classList.value === "settings-button button") {
    $(".country-name").text("Hover over a country for more info").css("font-size", "1.8rem");
    $(".country").removeClass("country--selected");
    $(".country-code").empty();
    $(".country-code").addClass("no-display");
    $(".capital-city").empty();
    $(".capital-city").addClass("no-display");
    $(".parameter-value").addClass("no-display");
  };
})