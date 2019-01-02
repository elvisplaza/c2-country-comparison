// Initializing variables
app.apiURL = 'https://api.worldbank.org/V2/';
app.countriesEndpoint = `countries/`;
app.indicatorsEndpoint = `all/indicators/`;
app.countryData = {};
app.searchResults = {};

// Array to store relevant indicator objects
app.indicatorObjects = [
  {
    id: "SP.POP.TOTL",
    name: "Total Population",
    tag: "population",
    value: "Population"
  },

  {
    id: "SP.POP.TOTL.FE.IN",
    name: "Female Total Population",
    tag: "population_fem",
    value: "Population (F)"
  },

  {
    id: "SP.POP.TOTL.MA.IN",
    name: "Male Total Population",
    tag: "population_male",
    value: "Population (M)"
  },

  {
    id: "NY.GDP.MKTP.CD",
    name: "GDP (current, $US)",
    tag: "gdp",
    value: "GDP (USD)"
  },

  {
    id: "NY.GDP.MKTP.KD.ZG",
    name: "GDP growth (annual %)",
    tag: "gdp-growth",
    value: "GDP growth"
  },

  {
    id: "SP.DYN.LE00.IN",
    name: "Life expectancy at birth, total",
    tag: "life-expectancy",
    value: "Life expectancy (yrs)"
  },

  {
    id: "5.51.01.01.poverty",
    name: "Income Poverty",
    tag: "poverty",
    value: "Income poverty"
  },

  {
    id: "EN.ATM.CO2E.KT",
    name: "CO2 emissions (kt)",
    tag: "co2",
    value: "CO2 emissions (kt)"
  },

  {
    id: "UIS.E.4",
    name: "Enrolment in Post-Secondary Education (both sexes)",
    tag: "education_ps",
    value: "Education (post-sec, %)"
  },

  {
    id: "UIS.E.3.GPV",
    name: "Enrolment in Secondary Education",
    tag: "education_sec",
    value: "Education (sec, %)"
  },
  {
    id: "SE.TOT.ENRR",
    name: "Gross enrolment ratio, primary school to tertiary (both sexes %)",
    tag: "education_prim",
    value: "Education (prim, %)"
  },

  {
    id: "SL.EMP.TOTL.SP.FE.NE.ZS",
    name: "Employment to population ratio, 15+, female (%)",
    tag: "employment_fem",
    value: "Employment (F, %)"
  },

  {
    id: "SL.EMP.TOTL.SP.MA.NE.ZS",
    name: "Employment to population ratio, 15+, male (%)",
    tag: "employment_male",
    value: "Employment (M, %)"
  },
];

// Make call to API passing indicators through and return data for indicator ID
app.indicatorCall = function (indicatorID) {
  return $.ajax({
    url: `${app.apiURL}${app.countriesEndpoint}${app.indicatorsEndpoint}${indicatorID.id}`,
    method: 'GET',
    dataType: 'json',
    data: {
      date: '2016',
      per_page: 400,
      format: 'json'
    }
  })
}

// Use defined indicator call to grab indicators for all countries 
app.getAllIndicators = function () {
  // Map over indicator objects array and make call for each
  const indicatorVals = app.indicatorObjects.map(app.indicatorCall);
  // When all have been returned:
  $.when(...indicatorVals)
    .then((...res) => {
      res.forEach(function (dataArray) {
        // Store data in array
        const fixedArray = dataArray[0][1];
        // Store ID of indicator
        const indicatorID = fixedArray[0].indicator.id;
        // Loop over fixed array
        fixedArray.forEach(function (object) {
          // Store ID of current country
          const currCountryID = object.country.id;
          // Update value for indicator in global country data object (if country ID exists)
          if (app.countryData[currCountryID] !== undefined) {
            app.countryData[currCountryID][indicatorID] = object.value;
          }
        })
      })
    })
}

// Grab all countries from API
app.countryDataPromise = function (){
  // Make API call to countries endpoint
  $.ajax({
    url: `${app.apiURL}${app.countriesEndpoint}`,
    method: 'GET',
    dataType: 'json',
    data: {
      per_page: 400,
      format: 'json'
    }
  }).then(res => {
    // For each item in resulting array
    res[1].forEach(function (item) {
      // Check that the item is not a region (to make sure it is actually a country)
      if (item.region.value !== "Aggregates") {
        // Create a new object in country data with country's iso2 code and store name, capital, geography details and income level
        app.countryData[item.iso2Code] = {
          name: item.name,
          capital: item.capitalCity,
          geography: {
            region: item.region.value,
            latitude: item.latitude,
            longitude: item.longitude,
            id: item.iso2Code
          },
          incomeLevel: item.incomeLevel.id,
        };
      };
    });
  }).then(() => {
    // Run second API call to grab indicator values for country
    app.getAllIndicators();
  }).then(()=>{
    // Make array from country data
    app.newCountryDataArray();
  });
}

// Initialize country data array
app.countryDataArray =[];
// Push each country from app.countryData into new array
app.newCountryDataArray = function(){
  for(let object in app.countryData){
    app.countryDataArray.push(app.countryData[object]);
  }
}

