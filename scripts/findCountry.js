// On hover, target country, pull ID value, find object with ID, and add values to the DOM

$('path').on('mouseover', function(){
  const hoveredCountryCode = $(this).attr("id");
  console.log(hoveredCountryCode);
  // const hoveredCountryHTML = `<h2 class="country-name"><span class="country-code" > AA</span ></h2 >
  // <p class="parameter-value">
  //   <span>Metric</span>
  //   <span>Number</span>
  //   <span>%</span>
  // </p>
  // <p class="parameter-value">
  //   <span>Metric</span>
  //   <span>Number</span>
  //   <span>%</span>
  // </p>`;
})

// < h2 class="country-name" > Country < span class="country-code" > AA</span ></h2 >
//   <p class="parameter-value">
//     <span>Metric</span>
//     <span>Number</span>
//     <span>%</span>
//   </p>
//   <p class="parameter-value">
//     <span>Metric</span>
//     <span>Number</span>
//     <span>%</span>
//   </p>