// BEM for html/css but camelCase. 
//interactive map 
//html + css component 

//HOME DIV
//JavaScript
//User inputs country
//user selects which parameters they want
//on submit - pull all parameters that are needed (10)
//use interactive map to attach countries to id
//on-hover will display the user's paramters comparing the selected countries. 
//set up an empty array to store data for all countries
//for each parameter, make API call and push returned data value to country array (as key value pair in a larger object)
//bubble div will be going to the right except for any countries on the right side, will pop up left
//on mobile, will click on more info in order open. 
//function to add pop-up module with the parameters displayed in a fancy design. 
//live update on selected parameters while on interactive map. 

// code for topics

//Total, Population = "SP.POP.TOTL" "SP.POP.TOTL.FE.IN", "SP.POP.TOTL.MA.IN"
//GDP (current, US$) = "NY.GDP.MKTP.CD"
    //"GDP growth (annual %)" = "NY.GDP.MKTP.KD.ZG"
    //"Income poverty" = "5.51.01.01.poverty"
//CO2 emissions (kt) = "EN.ATM.CO2E.KT"
//Education -  Wittgenstein Projection: Population in thousands by highest level of educational attainment. Post Secondary.  Enrolment in post-secondary non-tertiary education, both sexes (number) = "UIS.E.4"
// 	Enrolment in upper secondary general, both sexes (number)(UIS.E.3.GPV)
    // 	Gross enrolment ratio, primary to tertiary, both sexes (%) = SE.TOT.ENRR
//Gender Gap = Employment to population ratio, 15+, female (%) (national estimate) = "SL.EMP.TOTL.SP.FE.NE.ZS" - 	Employment to population ratio, 15+, male (%) (national estimate)(SL.EMP.TOTL.SP.MA.NE.ZS)

//	Unemployment, total (% of total labor force) (modeled ILO estimate)(SL.UEM.TOTL.ZS)
// Total employment, total(ages 15 +)(SL.EMP.TOTL)--- WRONG KEYWORD
//	Life expectancy at birth, total (years)(SP.DYN.LE00.IN)
// Depth of the food deficit(kilocalories per person per day)(SN.ITK.DFCT)
//Suicide mortality rate (per 100,000 population)(SH.STA.SUIC.P5)
//	Capital health expenditure (% of GDP)(SH.XPD.KHEX.GD.ZS)
// Current health expenditure(% of GDP)(SH.XPD.CHEX.GD.ZS)
// Number of people who are undernourished(SN.ITK.DEFC)