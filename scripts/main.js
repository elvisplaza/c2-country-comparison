app = {};
app.apiURL = 'https://api.worldbank.org/V2/';
app.countriesEndpoint = `countries/`;
app.indicatorsEndpoint = `all/indicators/`;

app.countryData = {};

app.indicatorObjects = [
  "SP.POP.TOTL",
  "SP.POP.TOTL.FE.IN",
  "SP.POP.TOTL.MA.IN",
  "NY.GDP.MKTP.CD",
  "NY.GDP.MKTP.KD.ZG",
  "SP.DYN.LE00.IN",
  "5.51.01.01.poverty",
  "EN.ATM.CO2E.KT",
  "UIS.E.4",
  "UIS.E.3.GPV",
  "SE.TOT.ENRR",
  "SL.EMP.TOTL.SP.FE.NE.ZS",
  "SL.EMP.TOTL.SP.MA.NE.ZS"
];

$(function () {
  app.indicatorCall = function (indicatorID) {
    return $.ajax({
      url: `${app.apiURL}${app.countriesEndpoint}${app.indicatorsEndpoint}${indicatorID}`,
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
        console.log(res);
        res.forEach(function (dataArray) {
          console.log(dataArray);
          const fixedArray = dataArray[0][1];
          const indicatorID = fixedArray[0].indicator.id;
          fixedArray.forEach(function (object) {
            // console.log(object);
            const currCountryID = object.country.id;
            if (app.countryData[currCountryID] !== undefined) {
              app.countryData[currCountryID][indicatorID] = object.value;
            }
          })
          console.log(app.countryData);
        })
      })
  }

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
    console.log(app.countryData);
  }).then(() => {
    app.secondAPICall();
  });
})