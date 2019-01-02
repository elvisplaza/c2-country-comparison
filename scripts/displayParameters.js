// Function to display names of indicators on DOM
app.displayIndicators = function(){
  // Map through all indicators
  app.indicatorObjects.forEach(function (object) {
    // Create parameter label and append to parameter fieldsets
    const parameterLabel = `
    <label class="label label--selected" for="${object.tag}">${object.value}</label>
    <input type="checkbox" id="${object.tag}" value="${object.value}" class="parameter-input visuallyhidden" checked>`;
    $(".parameters-fieldset").append(parameterLabel);

    // Create text label for hovered country data and append to modal
    const parameterCountryData = `<p class="parameter-value ${object.tag}">
						<span class="parameter-name ${object.tag}">${object.value}</span>
					</p>`;
    $(".map__country-data").append(parameterCountryData);

    // Create text label for chosen country data and append to modal
    const scParameterCountryData = `<p class="parameter-value-sc ${object.tag}">
						<span class="parameter-name-sc ${object.tag}">${object.value}</span>
					</p>`;
    $(".main-menu__chosen-country").append(scParameterCountryData);

  });

}









