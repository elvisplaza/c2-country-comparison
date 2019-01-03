// Function to display names of indicators on DOM
app.displayIndicators = function(){
  // Map through all indicators
  app.indicatorObjects.forEach(function (indicator) {
    // Create checkable/uncheckable parameter label and append to parameter fieldsets (on main page modal and "settings" dropdown on map page)
    const parameterLabel = `
    <label class="label label--selected" for="${indicator.tag}">${indicator.value}</label>
    <input type="checkbox" id="${indicator.tag}" value="${indicator.value}" class="parameter-input visuallyhidden" checked>`;
    $(".parameters-fieldset").append(parameterLabel);

    // Create text label for hovered country data and append to modal
    const parameterCountryData = `<p class="parameter-value ${indicator.tag}">
						<span class="parameter-name ${indicator.tag}">${indicator.value}</span>
					</p>`;
    $(".map__country-data").append(parameterCountryData);

    // Create text label for chosen country data and append to modal
    const parameterCountryDataSecondary = `<p class="parameter-value--secondary ${indicator.tag}">
						<span class="parameter-name--secondary ${indicator.tag}">${indicator.value}</span>
					</p>`;
    $(".main-menu__chosen-country").append(parameterCountryDataSecondary);
  });
}






