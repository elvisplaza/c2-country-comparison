// Function for cheat codes
app.cheatCodes = function () {
  const genderEqualityMode = [48, 51, 56];

  let codeCount = 0;

  document.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.keyCode === genderEqualityMode[codeCount]) {
      codeCount++;
    }

    if (codeCount == genderEqualityMode.length) {
      codeCount = 0;
      app.activateCode();
    }
  })
}

// Cheat code -- gender equality mode
app.activateCode = function () {
  console.log('gender equality mode activated')
}