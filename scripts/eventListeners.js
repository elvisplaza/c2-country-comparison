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
$("#country-form").on("submit", function(e) {
  e.preventDefault();
  $(this)
    .closest(".modal")
    .addClass("no-display");
});
