app = {};
app.apiURL = 'https://api.worldbank.org/V2/';
app.countriesEndpoint = `countries/`;
app.indicatorsEndpoint = `all/indicators/`;
app.countryData = {};
app.searchResults = {};

app.Init = function (){
  app.displayIndicators();
  app.countryDataPromise(); 
  app.countrySearch();
  app.mapCountrySearch();
}

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
    value: "Population (female)"
  },

  {
    id: "SP.POP.TOTL.MA.IN",
    name: "Male Total Population",
    tag: "population_male",
    value: "Population (male)"
  },

  {
    id: "NY.GDP.MKTP.CD",
    name: "GDP (current, $US)",
    tag: "gdp",
    value: "GDP"
  },

  {
    id: "NY.GDP.MKTP.KD.ZG",
    name: "GDP growth (annuel %)",
    tag: "gdp-growth",
    value: "GDP growth"
  },

  {
    id: "SP.DYN.LE00.IN",
    name: "Life expectancy at birth, total",
    tag: "life-expectancy",
    value: "Life expectancy"
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
    value: "CO2 emissions"
  },

  {
    id: "UIS.E.4",
    name: "Enrolment in Post-Secondary Education (both sexes)",
    tag: "education_ps",
    value: "Education (post-secondary)"
  },

  {
    id: "UIS.E.3.GPV",
    name: "Enrolment in Secondary Education",
    tag: "education_sec",
    value: "Education (secondary)"
  },

  {
    id: "SE.TOT.ENRR",
    name: "Gross enrolment ratio, primary school to tertiary (both sexes %)",
    tag: "education_prim",
    value: "Education (primary)"
  },

  {
    id: "SL.EMP.TOTL.SP.FE.NE.ZS",
    name: "Employment to population ratio, 15+, female (%)",
    tag: "employment_fem",
    value: "Employment (female)"
  },

  {
    id: "SL.EMP.TOTL.SP.MA.NE.ZS",
    name: "Employment to population ratio, 15+, male (%)",
    tag: "employment_male",
    value: "Employment (male)"
  }
];

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

  app.secondAPICall = function () {
    const indicatorVals = app.indicatorObjects.map(app.indicatorCall);
    $.when(...indicatorVals)
      .then((...res) => {
        res.forEach(function (dataArray) {      
          const fixedArray = dataArray[0][1];
          const indicatorID = fixedArray[0].indicator.id;
          fixedArray.forEach(function (object) {
            const currCountryID = object.country.id;
            if (app.countryData[currCountryID] !== undefined) {
              app.countryData[currCountryID][indicatorID] = object.value;
              
            }
          })
        })
      })
  }

  app.countryDataPromise = function (){
    $.ajax({
      url: `${app.apiURL}${app.countriesEndpoint}`,
      method: 'GET',
      dataType: 'json',
      data: {
        per_page: 400,
        format: 'json'
      }
    }).then(res => {
      res[1].forEach(function (item) {
        if (item.region.value !== "Aggregates") {
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
      app.secondAPICall();
    }).then(()=>{
      app.newcountryDataArray();
    });
  }

  //putting countrydata object into an array function
  app.countryDataArray =[]
    app.newcountryDataArray = function(){
      for(let array in app.countryData){
          app.countryDataArray.push(app.countryData[array]);
      }
    }
  



    
$(function() {
      app.Init();
  //SUBMIT BUTTON FOR MAIN-MENU PLEASE ADD TO EVENT LISTENERS. 
  $('.form-2').on('submit', function (e) {
    e.preventDefault()
    const value = $('#country-input-2').val();
    if(value.toLowerCase() == app.searchResults[0].name.toLowerCase()){
      const mapId = app.searchResults[0].geography.id
      $(`#${mapId}`).toggleClass('highlight')
    }
  });

  $('.country-list').on('click', 'li', function() {
    // console.log(this);
    clickedEvent = $(this).text();
    
    $(".country-list").addClass("no-display");
  })

  $('.modal__content').on('click', function(e){
    if (e.target.className !== "country-list__item") {
      $(".modal__content").addClass("no-display");
      // parametersDiv.addClass("no-display");
    }
  })
  


})

