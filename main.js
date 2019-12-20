var currentPassage = passage0;
var currentSituation = frostfire;
var availableSpirits = [wynn, aragorn, gandalf];

var availableSituations = [frostfire];
var spiritButtons = "";

//for each spirit the player has unlocked...

for (spi of availableSpirits) {
    
    // ...write the spirit's name, then a "recall" button to take them off whatever situation they are assigned to...
    
    spiritButtons = spiritButtons + spi._name + " " + "<button id='recall' class='button' onclick='spiritRecall("+spi._id+")'>Recall</button> ";
    
    //...and make a button to assign them to any of the currently available situations
    
    for(sit of availableSituations) {

        //"spanSpiButtXY" is a unique span ID that can be used to deactivate and reactivate buttons once they are pressed
        
        spiritButtons = spiritButtons + "<span id='spanSpiButt"+spi._id+sit._situationID+"'><button class='button' onclick='spiritAssign("+spi._id+","+sit._situationID+")'>"+sit._name+"</button></span>";
    }
    
  
    spiritButtons = spiritButtons + "<br><br>";
    
}

function spiritRecall(spiID){
    
    console.log(spiritArray);
    for(spi of spiritArray) {
    
        if(spi._id == spiID) {
            
            
            
        }
        
    }
    
}

function spiritAssign(spiritID,sitID) {
  
  console.log(spiritID);
  console.log(sitID);
  
  // when a spirit is assigned to a situation, deactivate that situation's button by replacing the button with plaintext
  document.getElementById("spanSpiButt"+spiritID+sitID).innerHTML = sit._name;
  
}

window.onload = document.getElementById("spiritDisplay").innerHTML = spiritButtons;

window.onload = document.getElementById("passageDisplay").innerHTML = currentPassage.ptext;


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
