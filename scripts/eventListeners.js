// Function to control visibility
app.toggleVis = function(elemToHideClass, elemToShowClass){
  $(elemToHideClass).addClass('no-display');
  $(elemToShowClass).removeClass('no-display');
}

// On click of parameter label, change highlight status
$(".parameters-fieldset").on("click", "label", function() {
  $(this).toggleClass("label--selected");
  const tagId = $(this).attr("for");
  console.log(tagId);
  $(`.parameter-value.${tagId}`).toggleClass('no-display');
});

// $('.parameters-fieldset').on('click', 'label', function(){
//   if $(this).hasClass('label--selec')
// })

$('#country-input--main-page').on('keyup copy paste cut change', function(){
  app.countrySearch('#country-input--main-page', '.country-list--main-page');
});

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

// On click of country submit button
$(".country-form").on("submit", function(e) {
  e.preventDefault();
  $(this)
    .closest(".modal")
    .addClass("no-display");
});

$('.country').on('mouseover', function(){
  // const clickedCountryID = $(this).attr("id");
  // $('.country-name').text(clickedCountryID);
  $(".country").removeClass("country--selected");
  $(this).addClass('country--selected');
})

$('.settings-button').on('click', function(){
  $('.main-menu__parameters').toggleClass('no-display');
  $(this).toggleClass("button--highlight");
});

$('.country-button').on('click', function () {
  if (app.userCountryID !== undefined) {
    $(".main-menu__chosen-country").toggleClass("no-display");
  }
});

// Initializing function
app.init = function () {
  app.displayIndicators();
  app.topCountries();
  app.countryDataPromise();
  app.countrySearch();
  app.cheatCodes();
}

// Document ready
$(function () {
  app.init();
});

