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

// Function to calculate difference between two values
app.calculateComparisonDiff = (num1, num2, indicatorTag) => {
  console.log(indicatorTag, num1, num2);
  // Initialize variable for value
  let value;
  // If both numerical values are null, or the second (hovered country) value is null, set the value to an empty string
  if (num1 == null && num2 == null || num2 == null) {
    value = '';
  // If only the user value is null, set the comparison value to 'N/A'
  } else if (num1 == null) {
    value = 'N/A';
  } else if (indicatorTag === 'population' || indicatorTag === 'population_fem' || indicatorTag === 'population_male') {
    value = (num2 - num1)/1000000;
  } else if (indicatorTag === 'gdp' || indicatorTag === 'education_ps' || indicatorTag === 'education_sec') {
    value = (num2 / num1) * 100;
  } else if (indicatorTag === 'gdp-growth' || indicatorTag === 'education_sec' || indicatorTag === 'education_prim' || indicatorTag === 'employment_fem' || indicatorTag === 'employment_male') {
    value = num2 - num1;
  } else if (indicatorTag === 'life-expectancy' || indicatorTag === 'poverty') {
    value = num2 - num1;
  }

  console.log('value', value);
  return value;
}

// Function to convert numerical comparison value to string with '+' or '-' in front, rounded to 2 decimal places
app.positiveOrNegative = value => {
  let stringValue;
  if (value > 0) {
    stringValue = `+${value.toFixed(2)}`
  } else if (value < 0) {
    stringValue = `${value.toFixed(2)}`
  } else if (value == 0) {
    stringValue = 'equal';
  } else {
    stringValue = value;
  }
  return stringValue;
}
// Function to convert comparison value to string for display on DOM
app.prepComparisonForDOM = (value, indicatorTag) => {
  let stringValue = app.positiveOrNegative(value);

  if (stringValue === 'N/A' || stringValue === '' || stringValue === 'equal') {
    stringValue = stringValue;
  } else if (indicatorTag === 'population' || indicatorTag === 'population_fem' || indicatorTag === 'population_male') {
    stringValue = `${stringValue}m`
  } else if (indicatorTag === 'gdp' || indicatorTag === 'gdp-growth' || indicatorTag === 'education_sec' || indicatorTag === 'education_prim' || indicatorTag === 'employment_fem' || indicatorTag === 'employment_male') {
    stringValue = `${stringValue}%`
  } else if (indicatorTag === 'life-expectancy') {
    stringValue = `${stringValue} years`
  }

  return stringValue;
}

app.displayParameterValues = (modalID, countryID, booleanForComparison) => {
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
    // Initialize user country value
    let userCountryIndicatorVal = app.countryData[app.userCountryID][indicatorID];

    // Calculate difference between two countries for indicator and store in variable
    const comparisonValue = app.calculateComparisonDiff(userCountryIndicatorVal, countryIndicatorVal, indicatorTag);

    // Convert comparison value to string for appending to DOM
    const comparisonValueForDOM = app.prepComparisonForDOM(comparisonValue, indicatorTag);
    // console.log('indicator tag', indicatorTag, 'comp val', comparisonValueForDOM, 'type', typeof (comparisonValueForDOM), 'num type', typeof (parseInt(comparisonValueForDOM)));

    // Find indicator location in DOM and fill with data
    const indicatorHTML = `<span class="parameter-num ${indicatorTag}">${indicatorValueForDOM}</span> <span class="parameter-perc ${indicatorTag}">${comparisonValueForDOM}</span>`;

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
}

