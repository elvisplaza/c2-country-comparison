app = {};
app.apiURL = 'https://api.worldbank.org/V2/';
app.countriesEndpoint = `countries/`;
app.indicatorsEndpoint = `all/indicators/`;
app.countryData = {};

app.Init = function (){
  app.countryDataPromise(); 
  app.countrySearch();
}

app.indicatorObjects = [
  {id:"SP.POP.TOTL",
  name:'Total Population'
},
  
  { id: "SP.POP.TOTL.FE.IN",
    name: "Female Total Population"
  },
  
  { id: "SP.POP.TOTL.MA.IN",
    name: "Male Total Population"
  },
  
  { id: "NY.GDP.MKTP.CD",
    name: "GDP (current, $US)"
  },
  
  { id: "NY.GDP.MKTP.KD.ZG",
    name: "GDP growth (annuel %)"
  },
  
  { id: "SP.DYN.LE00.IN",
    name: "Life expectancy at birth, total"
  },
  
  { id: "5.51.01.01.poverty",
    name: "Income Poverty"
  },
  
  { id: "EN.ATM.CO2E.KT",
    name: "CO2 emissions (kt)"
  },
  
  { id: "UIS.E.4",
    name: "Enrolment in Post-Secondary Education (both sexes)"
  },
  
  { id: "UIS.E.3.GPV",
    name: "Enrolment in Secondary Education"
  },
  
  { id: "SE.TOT.ENRR",
    name: "Gross enrolment ratio, primary school to tertiary (both sexes %)"
  },
  
  { id: "SL.EMP.TOTL.SP.FE.NE.ZS",
    name: "Employment to population ratio, 15+, female (%)"
  },
  
  { id: "SL.EMP.TOTL.SP.MA.NE.ZS",
    name:"Employment to population ratio, 15+, male (%)"
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
          app.countryData[item.iso2Code.toString()] = {
            name: item.name,
            capital: item.capitalCity,
            geography: {
              region: item.region.value,
              latitude: item.latitude,
              longitude: item.longitude,
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
  


    
$(function () {
      app.Init();
      
})


