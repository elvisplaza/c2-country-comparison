
app.displayChosenCountry = function(){
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

