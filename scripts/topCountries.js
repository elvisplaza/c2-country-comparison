app.topCountries = function(){
  app.topTen = [];
  const indicators = app.indicatorObjects.forEach(indicator => {
    // return indicator.id;
    // console.log(indicator);
    // const indicatorID = indicator.id;
    // const indicatorVal = indicator.value;
    app.findTopTen(indicator.id);

  });

  console.log(app.topTen);
}

app.findTopTen = function (indicatorID) {
  console.log(indicatorID);
  console.log(app.countryDataArray);
  const allVals = app.countryDataArray.map(country => {
    console.log(country);
    return country[indicatorID];
  });
  console.log(allVals);
  allVals.id = indicatorID;
  app.topTen.push(allVals);
}