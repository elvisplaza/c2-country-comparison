// On hover, target country, pull ID value, find object with ID, and add values to the DOM

$("path").on("mouseover", function() {
  
  app.comparisonCountryId = $(this).attr("id");
  console.log(app.countryData[app.comparisonCountryId]);
  const countryName = app.countryData[app.comparisonCountryId].name;
  $(".country-name").text(countryName);
  $(".country-code").text(app.comparisonCountryId);
  const value = app.countryData[app.comparisonCountryId]["SP.POP.TOTL"];

  app.indicatorObjects.forEach(function(item){
    // Grab indicator ID from array
    const indicatorID = item.id;

    // Grab indicator tag from array
    const indicatorTag = item.tag;

    // Grab value of indicator for chosen country from app.countryData object
    let countryIndicatorVal = app.countryData[app.comparisonCountryId][indicatorID];

    // Check if value is null or undefined, if yes, show "N/A", if no, round to nearest integer
    if (countryIndicatorVal == null || countryIndicatorVal == undefined) {
      countryIndicatorVal = "N/A";
    }

    // Find indicator location in DOM and fill with data
    const hoveredCountryHTML = `<span class="parameter-num ${indicatorTag}">${countryIndicatorVal}</span>`;

    $(`.parameter-num.${indicatorTag}`).text("");
    
    $(`.parameter-value.${indicatorTag}`).append(hoveredCountryHTML);
  })

  // const hoveredCountryHTML = `<span class="parameter-num">${value}</span>`;
  // $(".parameter-num").text("");
  // $('.parameter-value').append(hoveredCountryHTML);
});



// ADD TO EVENT LISTENER SO ON CLICK/UNCLICK IT ALSO CHANGES WHICH THINGS ARE VISIBLE IN THE COUNTRY DIV
// on mouseover, grab country ID
// go through app.countryData object and grab entire country object
// loop through app.countryData and match each indicator ID to the datakey on the metric span + match the country name, code, capital, etc.
// if it matches, populate with value




$('path').on('mouseoff', function(){
  // clear app.comparisonCountryId
  // empty and hide div
})