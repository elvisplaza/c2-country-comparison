// Function to control visibility
app.toggleVis = function(elemToHideClass, elemToShowClass){
  $(elemToHideClass).addClass('no-display');
  $(elemToShowClass).removeClass('no-display');
}

// On click of parameter label, change checked status
$(".parameters-fieldset").on("click", "label", function() {
  // Store tag ID in variable
  const tagId = $(this).attr("for");
  // Run function to toggle parameter visibility
  app.toggleParameterCheck(tagId);
  // Rerun function to display indicators so newly checked/unchecked value is shown/hidden
  app.displayIndicators();
  // Rerun function to display calculated parameter values on both country hover div and user country modal
  app.displayParameterValues(app.comparisonCountryID, true);
  app.displayParameterValues(app.userCountryID, false);
});

// On user entering text into main page country input, run country search function and show/hide relevant modal 
$('#country-input--main-page').on('keyup copy paste cut change', function(){
  app.countrySearch('#country-input--main-page', '.country-list--main-page');
});

// On user entering text into map page country input, run country search function and show/hide relevant modal 
$('#country-input--map-page').on('keyup copy paste cut change', function(){
  app.countrySearch('#country-input--map-page', '.country-list--map-page');
});

// On click of "I just want to browse" text, hide modal
$('.close').on('click', function(){
  $(this).closest('.modal').addClass('no-display');
})

// On click of "toggle parameters", show/hide the toggle content
$('.toggle').on('click', function(){
  $('.toggle__content').toggleClass('no-display');
})

// On click of any list item in dropdown menu on main page, change user country
$('.country-list--main-page').on('click touchend', 'li', function () {
  // Store "this" of clicked li in variable
  const clickedCountry = this;
  // Run function to change user country to clicked value and display in input field
  app.changeUserCountry(clickedCountry, '#country-input--main-page');
  // Hide search list modal
  $('.country-list--main-page').toggleClass('no-display');
})

// On click of any list item in dropdown menu on map page, change user country
$('.country-list--map-page').on('click touchend', 'li', function () {
  // Store "this" of clicked li in variable
  const clickedCountry = this;
  // Run function to change user country to clicked value and display in input field
  app.changeUserCountry(clickedCountry, '#country-input--map-page');
  // Hide search list modal
  $('.country-list--map-page').toggleClass('no-display');
})

// On submit of country search on main page:
$('.country-form--main-page').on('submit', function (e) {
  // Prevent default form submission action
  e.preventDefault();
  const self = this;
  // Run submit country input function passing relevant input and reference to form
  app.submitCountryInput('#country-input--main-page', self);
});

// On submit of country search on map page:
$('.country-form--map-page').on('submit', function (e) {
  console.log('map page submitted');
  // Prevent default form submission action
  e.preventDefault();
  const self = this;
  // Run submit country input function passing relevant input and reference to form
  app.submitCountryInput('#country-input--map-page', self);
});

// On click of settings button, show/hide parameters dropdown and change active color of button 
$('.settings-button').on('click touchend', function(){
  console.log('settings clicked');
  $('.country-button').removeClass('button--highlight');
  $(".main-menu__chosen-country").addClass("no-display");
  $('.main-menu__parameters').toggleClass('no-display');
  $(this).toggleClass("button--highlight");
});

// On click of country button, show/hide country details dropdown and change active color of button (if there is a user country)
$('.country-button').on('click touchend', function () {
  if (app.userCountryID !== undefined) {
    $('.settings-button').removeClass('button--highlight');
    $('.main-menu__parameters').addClass('no-display');
    $(this).toggleClass("button--highlight");
    $(".main-menu__chosen-country").toggleClass("no-display");
  }
});

// Initializing function
app.init = function () {
  app.displayIndicators();
  app.topCountries();
  app.countryDataPromise();
  app.countrySearch();
  // app.cheatCodes();
}

// Document ready
$(function () {
  app.init();
});

