app = {};

// Array to store relevant indicator objects
app.indicatorObjects = [
  {
    id: "SP.POP.TOTL",
    name: "Total Population",
    tag: "population",
    value: "Population",
    checked: true,
  },

  {
    id: "SP.POP.TOTL.FE.IN",
    name: "Female Total Population",
    tag: "population_fem",
    value: "Population (F)",
    checked: true,
  },

  {
    id: "SP.POP.TOTL.MA.IN",
    name: "Male Total Population",
    tag: "population_male",
    value: "Population (M)",
    checked: true,
  },

  {
    id: "NY.GDP.MKTP.CD",
    name: "GDP (current, $US)",
    tag: "gdp",
    value: "GDP (USD)",
    checked: true,
  },

  {
    id: "NY.GDP.MKTP.KD.ZG",
    name: "GDP growth (annual %)",
    tag: "gdp-growth",
    value: "GDP growth",
    checked: true,
  },

  {
    id: "SP.DYN.LE00.IN",
    name: "Life expectancy at birth, total",
    tag: "life-expectancy",
    value: "Life expectancy",
    checked: true,
  },

  {
    id: "5.51.01.01.poverty",
    name: "Income Poverty",
    tag: "poverty",
    value: "Income poverty",
    checked: true,
  },

  // {
  //   id: "EN.ATM.CO2E.KT",
  //   name: "CO2 emissions (kt)",
  //   tag: "co2",
  //   value: "CO2 emissions (kt)",
  //   checked: true,
  // },

  {
    id: "UIS.E.4",
    name: "Enrolment in Post-Secondary Education (both sexes)",
    tag: "education_ps",
    value: "Education (post-sec)",
    checked: true,
  },

  {
    id: "UIS.E.3.GPV",
    name: "Enrolment in Secondary Education",
    tag: "education_sec",
    value: "Education (sec)",
    checked: true,
  },
  {
    id: "SE.TOT.ENRR",
    name: "Gross enrolment ratio, primary school to tertiary (both sexes %)",
    tag: "education_prim",
    value: "Education (prim)",
    checked: true,
  },

  {
    id: "SL.EMP.TOTL.SP.FE.NE.ZS",
    name: "Employment to population ratio, 15+, female (%)",
    tag: "employment_fem",
    value: "Employment (F)",
    checked: true,
  },

  {
    id: "SL.EMP.TOTL.SP.MA.NE.ZS",
    name: "Employment to population ratio, 15+, male (%)",
    tag: "employment_male",
    value: "Employment (M)",
    checked: true,
  },
];

// Function to prepare value for DOM
app.prepareForDOM = (tag, num) => {
  let value = num; 
  if (num == null || num == undefined) {
    value = `N/A`;
  } else if (tag === 'population' || tag === 'population_fem' || tag === 'population_male') {
    value = `${(((num / 1000000) * 100) / 100).toFixed(2)}m`;
  } else if (tag === 'gdp' && num > 1000000000000) {
    value = `$${(((num / 1000000000000) * 100) / 100).toFixed(2)}t`;
  } else if (tag === 'gdp' && num > 1000000000) {
    value = `$${(((num / 1000000000) * 100) / 100).toFixed(2)}b`;
  } else if (tag === 'gdp') {
    value = `$${(((num / 1000000) * 100) / 100).toFixed(2)}m`;
  } else if (tag === 'education_ps' && num > 1000000 || tag === 'education_sec' && num > 1000000) {
    value = `${(((num / 1000000) * 100) / 100).toFixed(2)}m`;
  } else if (tag === 'education_ps' && num < 1000000 || tag === 'education_sec' && num < 1000000) {
    value = `${Math.round(num)}`;
  } else if (tag === 'gdp-growth' || tag === 'education_prim' || tag === 'employment_fem' || tag === 'employment_male') {
    value = `${(num).toFixed(2)}%`;
  } else if (tag === 'life-expectancy') {
    value = `${(num).toFixed(1)} years`;
  } else {
    value = `${(num).toFixed(1)}`;
  }
  return value;
}

app.calculateComparisonDiff = (num1, num2, indicatorTag) => {
  let value;
  if (num1 == null || num2 == null) {
    value = 'N/A';
  } else if (indicatorTag === 'population' || indicatorTag === 'population_fem' || indicatorTag === 'population_male' || indicatorTag === 'gdp' || indicatorTag === 'education_ps' || indicatorTag === 'education_sec') {
    value = ((num2 - num1) / num1).toFixed(2);
  } else if (indicatorTag === 'gdp-growth' || indicatorTag === 'education_sec' || indicatorTag === 'education_prim' || indicatorTag === 'employment_fem' || indicatorTag === 'employment_male') {
    value = `${(num2 - num1).toFixed(2)}%`;
  } else if (indicatorTag === 'life-expectancy') {
    value = `${(num2 - num1).toFixed(2)} years`
  } else if (indicatorTag === 'poverty') {
    value = `${(num2 - num1).toFixed(2)}`;
  }

  return value;
}

app.displayParameterValues = (modalID, countryID, booleanForComparison) => {
    // Takes in ID of modal where parameters are being appended, boolean to determine whether or not to run comparison
  // Map over indicator
// Check if indicator is checked or not
// If not, add class 'no-display' and exit array map
// If yes, find value, prepare value for display on DOM, and append to DOM using "modalID" variable

  // Loop through all indicator objects
  app.indicatorObjects.forEach(function (item) {
    // Grab indicator ID from array
    const indicatorID = item.id;

    // Grab indicator tag from array
    const indicatorTag = item.tag;

    // Grab value of indicator for chosen country from app.countryData object
    let countryIndicatorVal = app.countryData[countryID][indicatorID];

    const indicatorValueForDOM = app.prepareForDOM(indicatorTag, countryIndicatorVal);

  if (booleanForComparison === true && app.userCountryObject !== null) {
  // Check if user country object exists
    // If yes, and value for param is not null, calculate difference between two values
    // If yes, but value for param is null, add "N/A"
    // If no, add "no-display" to parameter

    // Initialize user country value
    let userCountryIndicatorVal = app.countryData[app.userCountryID][indicatorID];

    // const comparisonValueForDOM = 'N/A';
    let comparisonValueForDOM = app.calculateComparisonDiff(userCountryIndicatorVal, countryIndicatorVal, indicatorTag);
    // console.log('indicator tag', indicatorTag, 'comp val', comparisonValueForDOM, 'type', typeof (comparisonValueForDOM), 'num type', typeof (parseInt(comparisonValueForDOM)));

    // Find indicator location in DOM and fill with data
    const indicatorHTML = `<span class="parameter-num ${indicatorTag}">${indicatorValueForDOM}</span> <span class="parameter-perc ${indicatorTag}">${comparisonValueForDOM}</span>`;

    // Change color of comparison value based on whether it is above or below 0
    if (parseInt(comparisonValueForDOM) > 0) {
      console.log(indicatorTag, 'above 0', parseInt(comparisonValueForDOM));
      comparisonValueForDOM = `+${comparisonValueForDOM}`;
      $(`.parameter-perc.${indicatorTag}`).css("color", "#8DB762");
    } else if (parseInt(comparisonValueForDOM) < 0) {
      console.log(indicatorTag, 'below 0', parseInt(comparisonValueForDOM));
      $(`.parameter-perc.${indicatorTag}`).css("color", "#FF3460");
    } else {
      console.log(indicatorTag, 'other', parseInt(comparisonValueForDOM));
      $(`.parameter-perc.${indicatorTag}`).css("color", "white");
    }

    $(`.parameter-value.${indicatorTag}`).append(indicatorHTML);


  } else if (booleanForComparison === true && app.userCountryObject === null){
    // const comparisonValueForDOM = 'N/A';
    const comparisonValueForDOM = 'N/A';

    // Find indicator location in DOM and fill with data
    const indicatorHTML = `<span class="parameter-num ${indicatorTag}">${indicatorValueForDOM}</span> <span class="parameter-perc ${indicatorTag} no-display">${comparisonValueForDOM}</span>`;

    $(`.parameter-value.${indicatorTag}`).append(indicatorHTML);
  } else if (booleanForComparison === false) {

    // Find indicator location in DOM and fill with data
    const indicatorHTML = `<span class="parameter-num--secondary ${indicatorTag}">${indicatorValueForDOM}</span>`;

    $(`.parameter-value--secondary.${indicatorTag}`).append(indicatorHTML);
  }
  })

// If comparison boolean is true:
  // Check if user country object exists
    // If yes, and value for param is not null, calculate difference between two values
    // If yes, but value for param is null, add "N/A"
    // If no, add "no-display" to parameter
}



// Map over indicator 
// Check if indicator is checked or not
// If not, add class 'no-display' and exit array map
// If yes, find value, prepare value for display on DOM, and append to DOM


