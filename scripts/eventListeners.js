// Function to control visibility
app.toggleVis = function(elemToHideClass, elemToShowClass){
  $(elemToHideClass).addClass('no-display');
  $(elemToShowClass).removeClass('no-display');
}

// On click of parameter label, change highlight status
$('.label').on('click', function() {
  $(this).toggleClass('label--selected');
  const value = $(this).text();
  console.log(value);
})

// On click of "I just want to browse" text, hide modal
$('.close').on('click', function(){
  $(this).closest('.modal').addClass('no-display');
})

// On click of "toggle parameters", show/hide the toggle content
$('.toggle').on('click', function(){
  $('.toggle__content').toggleClass('no-display');
})

// On click of country submit button
$('#country-form').on("submit", function(e) {
  e.preventDefault();
  $(this)
    .closest(".modal")
    .addClass("no-display");
})

$('.country').on('mouseover', function(){
  const clickedCountryID = $(this).attr("id");
  console.log(clickedCountryID);
  $('.country-name').text(clickedCountryID);
})

$('.main-menu__settings .button').on('click', function(){
  $('.main-menu__parameters').toggleClass('no-display');
  $(this).toggleClass("button--highlight");
});

$('body').on('click', function(e){
  // console.log(e.target);
  const clickTarget =  e.target.className;
  // console.log(e.target.hasClass("main-menu__settings"));
  console.log(clickTarget);
  const settingsButton = $('.main-menu__settings');
  const parametersDiv = $(".main-menu__parameters");
  const parametersClass = `main-menu__parameters`;
  if (clickTarget !== parametersClass || clickTarget === undefined || clickTarget !== null) {
    settingsButton.removeClass("button--highlight");
    parametersDiv.addClass('no-display');
  }
})

