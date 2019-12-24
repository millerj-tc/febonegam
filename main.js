var currentPassage;
var currentSituation;
var availableSpirits = [wynn];

var availableSituations = [frostfire];
var spiritButtons = "";

window.onload = loadPassage(0);

function loadPassage(pID) {
    
    var passageButtonsString = "";
    
    var pass = findPassageByID(pID);
    
    // If the passage has special code associated with it, this will execute that code (stored in the "execute" method of a special class)
    
    if(typeof pass._storyFX != "undefined") {
    
        pass._storyFX.execute();
        
    }
    
    document.getElementById("passageDisplay").innerHTML =  pass._ptext;
    
    // Draw the buttons that advance the story passages below the passage text
    
    for(butt of pass._progressButtons) {
        
        // each butt(on) actually holds the whole passage object that the button leads  to -- that's why it can refer to storyID, linkText, etc.
        
        passageButtonsString = passageButtonsString + "<button onclick='loadPassage(" + butt._storyID + ")'>" + butt._linkText + "</button>" +"<br>";
        
    }
    
    document.getElementById("passageButtons").innerHTML = passageButtonsString;
    currentPassage = pass;
    
    refreshSituationButtons();
    refreshSpiritButtons();
    refreshUnderstanding();
}

function refreshSpiritButtons() {
    
    
    // Only draw the spirit buttons if there are situations to address
    
    if(availableSituations.length == 0 || typeof availableSituations == "undefined") {
        return false;
    }
    
    //for each spirit the player has unlocked...
    
    var compatQuote = "";
    
    spiritButtons = "<hr><br>";
    
    for (spi of availableSpirits) {

        // ...write the spirit's name, then a "recall" button to take them off whatever situation they are assigned to...
        

        spiritButtons = spiritButtons + spi._name + " " + "<button id='recall' class='button' onclick='spiritRecall("+spi._id+")'>Recall</button> ";

        //...and make a button to assign them to any of the currently available situations (unless they are already assigned to that situation)

        for(sit of availableSituations) {

            //"spanSpiButtXY" is a unique span ID that can be used to deactivate and reactivate buttons once they are pressed
            
            if(spi._sitAssignment == sit) {
                
                spiritButtons = spiritButtons + "<span id='spanSpiButt'"+spi._id+sit._situationID+">"+sit._name+"</span>"
                    
                compatQuote = sit.findCompatibility(spi._id)._spiritCompatQuote;    
                
            }
            
            else {
                
                spiritButtons = spiritButtons + "<span id='spanSpiButt"+spi._id+sit._situationID+"'><button class='button' onclick='spiritAssign("+spi._id+","+sit._situationID+")'>"+sit._name+"</button> </span>";
                compatQuote = "";
                
            }
        }


        spiritButtons = spiritButtons + "<br>" + "<span id='compatQuote"+spi._id + "'>"+compatQuote+"</span>";
        spiritButtons = spiritButtons + "<br><br>";

    }
    
    //write the combined string to the page
    
    spiritButtons = spiritButtons + "<br><hr><br>";
    
    window.onload = document.getElementById("spiritDisplay").innerHTML = spiritButtons;
}

function refreshSituationButtons() {
    
    
    if(typeof currentSituation == "undefined")  {return false;}
    
    var situationButtons = "<button onclick='buttonSwitch()'>Channel</button> <button onclick='rateRefresh()'>Refresh</button> <span id='rateIndicator' class='rateIndicator'></span><span id='rate'></span><br><br><span id='rateQuote'></span><hr><br>";
    
    
    
    
    for(sit of availableSituations) {
        if(currentSituation != sit) {
            
            
            situationButtons = situationButtons + "<button class='button' onclick='refreshUnderstanding("+sit._situationID+")'>"+sit._name+"</button> ";
            
        }
        
        else {
            situationButtons = situationButtons + sit._name + " ";
            
        }
        
        
    }
    
    
    document.getElementById("situationButtons").innerHTML = situationButtons;
}

function refreshUnderstanding(sitID,ldPassage = 0) {
    

    //THIS IS FUCKING WITH THE CHANNEL BUTTON BECAUSE OF THE DARK TURQUOISE REFRESH -- IS WHAT I THINK. ALSO I NEED TO REBUILD COMPAT QUOTES TO BE TIERED BUT ALSO SPECIAL?
    
    
    var understandingDisplay = "";
    
    currentSituation = findSituationByID(sitID);
    
//    for(spi of currentSituation._assignedSpirits) {
//        
//        understandingDisplay = understandingDisplay + spi._name + ": "
//        
//    }
    
    if(typeof currentSituation == "undefined") {
        
        return false;        
    }
    
    for(und of currentSituation._understandingEntries) {
        
        if(currentSituation._effort >= und._understandingEffort) {
            
            understandingDisplay = understandingDisplay + und._understandingQuote + "<br><br>";    
            
        }
        
    }
    
    refreshSituationButtons();
    document.getElementById("understandingDisplay").innerHTML = understandingDisplay;
    document.getElementById("rateIndicator").style.backgroundColor = "darkturquoise";

}

window.onload = refreshSpiritButtons();
window.onload = refreshSituationButtons();
window.onload = refreshUnderstanding();

function findSpiritByID(id) {
    for(spi of spiritArray) {
        if(id == spi._id) {
            return spi;
        }
    }
}

function findPassageByID(id) {
    for(pass of passageArray) {
        if(id == pass._storyID) {
            return pass;
        }
    }
}

function findSituationByID(id) {
    for(sit of situationArray) {    
        if(id == sit._situationID) {    
            return sit;
        }
    }
}


function spiritRecall(spiID){
    
    var funcSpirit = findSpiritByID(spiID);       
    //reset the button
    document.getElementById("spanSpiButt"+spiID+funcSpirit._sitAssignment._situationID).innerHTML = "<button class='button' onclick='spiritAssign("+funcSpirit._id+","+funcSpirit._sitAssignment._situationID+")'>"+sit._name+"</button>";
    document.getElementById("compatQuote"+spiID).innerHTML = "";
    //unassign the spirit from the situation
    funcSpirit._sitAssignment._assignedSpirits = funcSpirit._sitAssignment._assignedSpirits.filter(x => x != funcSpirit);
    //remove the situation assignment from the spirit object
    funcSpirit._sitAssignment = [];
            
    
}

function spiritAssign(spiritID,sitID) {
  
    
  var currentSpirit = findSpiritByID(spiritID);
  
  //get the spirit compatibility quote
  var funcSituation = findSituationByID(sitID);
    
  
  // when a spirit is assigned to a situation, deactivate that situation's button by replacing the button with plaintext
  document.getElementById("spanSpiButt"+spiritID+sitID).innerHTML = sit._name + " ";
  document.getElementById("compatQuote"+spiritID).innerHTML = funcSituation.findCompatibility(spiritID)._spiritCompatQuote;
  //assign the situation to the spirit object
  currentSpirit._sitAssignment = funcSituation;
  //add the sprit to the situation's array of assigned spirits
  funcSituation._assignedSpirits.push(currentSpirit);
  
}

window.onload = document.getElementById("passageDisplay").innerHTML = currentPassage.ptext;


var tapOn = 0;
var buttonTimer = [];
var rateTimer = [];
var tapInterval = 0;
var tapArray = [];
var avgTapInterval = 0;
var blinkTimer = [];
var blinkReset = [];
var timeout;

function buttonSwitch() {
    
    rateBlink("buttonClick");
  
  if(tapOn == 1) {
      tapArray.push(tapInterval);
      tapInterval = 0;
      for (x of tapArray) {
          avgTapInterval = avgTapInterval + x;   
    		}
      avgTapInterval = avgTapInterval/tapArray.length;
      //clearInterval(blinkTimer);
      //blinkTimer = window.setInterval(function(){rateBlink("blinkInterval")},avgTapInterval*1000);
      //avgTapInterval = 0;
  }
    if (tapOn == 0) {
      tapOn = 1;
      buttonTimer = window.setInterval(setRate, 100);
      }
    
    tapController(2);
    document.getElementById("rateQuote").innerHTML = tapQuote;
    clearTimeout(timeout);
    timeout = window.setTimeout(tapQuoteTimeout, 3125);
}
  
function tapQuoteTimeout() {
    
    document.getElementById("rateQuote").innerHTML = "";
    
}
    
 function setRate() {
      tapInterval = tapInterval + .1;      
  }


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

function rateRefresh() {
    
    tapOn = 0;
    tapArray = [];
    tapInterval = 0;
    avgTapInterval = 0;
    clearInterval(buttonTimer);
    tapController();
    
}

window.setInterval(function(){tapController(1)},1000);

var tapQuote = "";

function tapController(mode=0) {
    
    var tapQ = "";
    
    //If this was triggered by channeling, add effort to situation based on rate
    
    if(mode == 2) {
    
        for(tapR of currentSituation._tapFX) {


            if(avgTapInterval <= tapR._rateMin && avgTapInterval >= tapR._rateMax) {

                tapFX = tapR._effort;
                tapQ = tapR._tapQuote;
                break;


            }

            else {

                tapFX = 0;
                tapQ = "";

            }

        }
        currentSituation._effort = currentSituation._effort + tapFX;
        
    }
    
    // If this was triggered by the regular interval, update each situation's effort based on the spirits assigned to it.
    
    if(availableSituations.length == 0 || typeof availableSituations == "undefined") {    
     return false;   
    }
    
    if(mode == 1) {
        
        for(sit of availableSituations) {
            
            for(compat of sit._spiritCompatability) {
                
                for(spi of sit._assignedSpirits) {
                    
                    if(compat._spiritCompatName == spi._name) {
                        
                        sit._effort = sit._effort + compat._spiritCompatEffort;
                    }
                }      
                
            }
            
        }
        
    }
    
    if(typeof currentSituation == "undefined") {
        
        currentSituation = availableSituations[0];
        
    }
    
    refreshUnderstanding(currentSituation._situationID);
    document.getElementById("rate").innerHTML = avgTapInterval;
    tapQuote = tapQ;
    
}