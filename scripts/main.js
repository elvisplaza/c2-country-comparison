
$(function () {
    app = {}
    app.megaObject = {}
    app.apiURL = "https://api.worldbank.org/V2/countries"
    app.indicatorValue = "indicators/SP.POP.TOTL?"
    // app.country = "ca"


    
    
    class CountryObject {
        construct(){
            this.popValue = "dont know yet"
            this.gdpGrowth = "dont know yet"
        }
        getPopValue(country){
            $.ajax({
                url:`${app.apiURL}${country}${app.indicatorValue}`,
                method: 'GET',
                dataType: 'json',
                data: {
                    date: '2016',
                    per_page: 300,
                    format: 'json'
                }
            }).then((res)=>{
                console.log(res)
            })
        }
    }
    
    
    let canada = new CountryObject();
    console.log(canada.getPopValue('/can/'))
});




// https://api.worldbank.org/V2/countries/ca/indicators/SP.POP.TOTL?format=json





//     app.indicatorCall = function (indicatorID) {
//         return $.ajax({
//             url: `${app.apiURL}${app.indicatorsEndpoint}${indicatorID}`,
//             method: 'GET',
//             dataType: 'json',
//             data: {
//                 date: '2016',
//                 per_page: 300,
//                 format: 'json'
//             }
//         })
//     }

 
    

//     const indicatorObjects = ['SP.POP.TOTL', 'SP.POP.TOTL.FE.IN', 'SP.POP.TOTL.MA.IN', 'NY.GDP.MKTP.CD', 'NY.GDP.MKTP.KD.ZG', 'SP.DYN.LE00.IN', '5.51.01.01.poverty', 'EN.ATM.CO2E.KT', 'UIS.E.4', 'UIS.E.3.GPV', 'SE.TOT.ENRR', 'SL.EMP.TOTL.SP.FE.NE.ZS', 'SL.EMP.TOTL.SP.MA.NE.ZS'];

//     const indicatorVals = indicatorObjects.map(app.indicatorCall);

//     $.when(...indicatorVals)
//         .then((...res ) => {
            
//             app.countryArrays = res.map(function (indicatorArray) {
//                 // console.log(indicatorArray);
//                 const indicatorID = indicatorArray[0][1][0].indicator.id;
//                 const indicatorVal = indicatorArray[0][1][0].indicator.value;
//                 const dataArray = indicatorArray[0][1].map(function (object) {
//                     return {
//                         countryId: object.country.id,
//                         [indicatorID]: object.value,
//                     };
//                 })
//                 const finalDataArray = [dataArray];
//                 // finalDataArray.push(dataArray);
//                 console.log(finalDataArray);
//             })
//         }, )

        
        
//         // app.pushToMasterArray = function(dataArray){
//         //    dataArray.map(function(data){
//         //        if(dataArray.countryId === country){
        
//         //        }
//         //    })
//         // }







// });
