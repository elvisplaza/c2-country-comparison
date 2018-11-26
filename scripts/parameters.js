app.displayIndicators = function(){
  app.indicatorObjects.forEach(function (object) {
    const parameterLabel = `
    <label class="label label--selected" for="${object.tag}">${object.value}</label>
    <input type="checkbox" id="${object.tag}" value="${object.value}" class="parameter-input visuallyhidden" checked>`;
    $(".parameters-fieldset").append(parameterLabel);

    const parameterCountryData = `<p class="parameter-value ${object.tag}">
						<span class="parameter-name ${object.tag}">${object.value}</span>
					</p>`;
    $(".map__country-data").append(parameterCountryData);

    const scParameterCountryData = `<p class="parameter-value-sc ${object.tag}">
						<span class="parameter-name-sc ${object.tag}">${object.value}</span>
					</p>`;
    $(".main-menu__chosen-country").append(scParameterCountryData);

  });

}









