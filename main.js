var currentPassage = passage0;
var currentSituation = frostfire;
var availableSpirits = [wynn, aragorn, gandalf];

var availableSituations = [frostfire];
var spiritButtons = "";

for (spi of availableSpirits) {
    
    spiritButtons = spiritButtons + spi._name + " ";
    
    for(sit of availableSituations) {
        console.log(sit);
        spiritButtons = spiritButtons + "<button class='button' onclick='buttonSwitch()'>"+sit._name+"</button>";
    }
    
    spiritButtons = spiritButtons + "<br>"
    
}

window.onload = document.getElementById("spiritDisplay").innerHTML = spiritButtons;

window.onload = document.getElementById("passageDisplay").innerHTML = currentPassage.ptext;


var buttonRotation = 0;
var tapOn = 0;
var buttonTimer = [];
var rateTimer = [];
var tapInterval = 0;
var tapArray = [];
var avgTapInterval = 0
var tapDataPoints = 0;
var blinkTimer = [];
var blinkReset = [];

function buttonSwitch() {
    
  rateBlink("buttonClick");
  
  if(tapOn == 1) {
      tapArray.push(tapInterval);
      tapInterval = 0;
      var x;
      for (x of tapArray) {
          avgTapInterval = avgTapInterval + x;   
    		}
      avgTapInterval = avgTapInterval/tapArray.length;
      clearInterval(blinkTimer);
      blinkTimer = window.setInterval(function(){rateBlink("blinkInterval")},avgTapInterval*1000);
      document.getElementById("rate").innerHTML = avgTapInterval;
      avgTapInterval = 0;
  }
    if (tapOn == 0) {
      tapOn = 1;
      buttonTimer = window.setInterval(setRate, 100);
      currentPassage = currentPassage.passageLinks;
      document.getElementById("passageDisplay").innerHTML = currentPassage.ptext;
      }
    
    
}
  
    
 function setRate() {
      tapInterval = tapInterval + .1;      
  }

window.onload = document.getElementById("rateIndicator").style.backgroundColor = "darkturquoise";

function rateBlink(timerName) {
   if(document.getElementById("rateIndicator").style.backgroundColor == "darkturquoise") {
        document.getElementById("rateIndicator").style.backgroundColor = "red";
        clearInterval(blinkReset);
        blinkReset = window.setInterval(function(){rateBlink("blinkReset")}, 225);
    }
    else {
        clearInterval(blinkReset);
        document.getElementById("rateIndicator").style.backgroundColor = "darkturquoise";
    }

}
