
// Parameter values are set to true by default and stored in an array
// On click, parameter value is changed in array AND value in div is changed
// On click again, boolean value changes
// Everytime the user clicks, the value changes instantly
// Use label classes for the click functions

// Create a function which goes through the indicator objects array and appends each item to the DOM as a parameter label tag
app.displayIndicators = function(){
  app.indicatorObjects.forEach(function (object) {
    const parameterDOMObject = `
    <label class="label label--selected" for="${object.tag}">${object.value}</label>
    <input type="checkbox" id="${object.tag}" value="${object.value}" data-code="${object.id}" class="parameter-input visuallyhidden" checked>`;
    $(".parameters-fieldset").append(parameterDOMObject);
  });

  app.parameterVisibility();
}

// Check each parameter input, see if it is checked, if yes, display it on the map overlay box
app.parameterVisibility = function(){
  $(".parameter-input").each(function() {
    // console.log(object);
    const paramVal = $('.parameter-value');
    const classToCheck = $('')
    if ($(this).prop("checked") === true) {
      paramVal.hasClass(`${object.id}`).removeClass('no-display');
      console.log(`${dataKey} is checked`);
    } else {
      paramVal.hasClass(`${object.id}`).addClass('no-display');
      console.log(`${dataKey} is not checked`);
    }
  });
}








