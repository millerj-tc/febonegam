var currentPassage;
var currentSituation;
var availableSpirits = [wynn];

var availableSituations = [];
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
    
    defaultCurrentSit();
    refreshSituationButtons(0);
    refreshRateIndicator();
    refreshSpiritButtons();
    refreshUnderstanding();
}


function refreshSpiritButtons() {
    
    
    // Only draw the spirit buttons if there are situations to address
    
    if(availableSituations.length == 0 || typeof availableSituations == "undefined") {
        return false;
    }
    
    //for each spirit the player has unlocked...
    
    
    spiritButtons = "<hr><br>";
    
    for (spi of availableSpirits) {

        // ...write the spirit's name, then a "recall" button to take them off whatever situation they are assigned to...
        

        spiritButtons = spiritButtons + spi._name + " " + "<button id='recall' class='button' onclick='spiritRecall("+spi._id+")'>Recall</button> ";

        //...and make a button to assign them to any of the currently available situations (unless they are already assigned to that situation)
        

        for(sit of availableSituations) {

            //"spanSpiButtXY" is a unique span ID that can be used to deactivate and reactivate buttons once they are pressed
            
            if(spi._sitAssignment == sit) {
                
                spiritButtons = spiritButtons + "<span id='spanSpiButt"+spi._id+sit._situationID+"'>"+sit._name+"</span>"
                    
                
            }
            
            else {
                
                spiritButtons = spiritButtons + "<span id='spanSpiButt"+spi._id+sit._situationID+"'><button class='button' onclick='spiritAssign("+spi._id+","+sit._situationID+")'>"+sit._name+"</button> </span>";
                //compatQuote = "";
                
            }
            
        }


        //spiritButtons = spiritButtons + "<br>" 
            //+ "<span id='compatQuote"+spi._id + "'>"+compatQuote+"</span>";
        spiritButtons = spiritButtons + "<br><br>";

    }
    
    //write the combined string to the page
    
    spiritButtons = spiritButtons + "<hr><br>";
    
    window.onload = document.getElementById("spiritDisplay").innerHTML = spiritButtons;
}

function refreshSituationButtons(x) {
    
    //MAKE A SEPARATE FUNCTION FOR BUTTON CLICKING SEPARATE FROM WHAT NEEDS TO BE UPDATED BY THE TICK
    
    
    if(typeof currentSituation == "undefined")  {return; }
    
    var situationButtons = "<button onclick='buttonSwitch()'>Channel</button> <button onclick='rateRefresh()'>Refresh</button> <span id='rateIndicator' class='rateIndicator'></span><span id='rate'></span><br><br><span id='rateQuote'></span><hr><br>";
    
    

    
    for(sit of availableSituations) {
        if(currentSituation != sit) {
            
            
            situationButtons = situationButtons + "<button class='button' onclick='sitClick("+sit._situationID+")'>"+sit._name+"</button> ";
            
        }
        
        else {
            situationButtons = situationButtons + sit._name + " ";
            
        }
        
        
    }
    
    
    document.getElementById("situationButtons").innerHTML = situationButtons;
    
//    if(x == 0) {
//
//        console.log('set');
//        document.getElementById("rateIndicator2").style.backgroundColor = "darkturquoise";
//        
//    }
//    
//    console.log(document.getElementById("rateIndicator2").style.backgroundColor);
}

function sitClick(sitID) {
    
    currentSituation = findSituationByID(sitID);
    refreshRateIndicator();
    refreshSituationButtons();
    refreshSpiritQuotes();
    refreshSpiritIcon();
    refreshUnderstanding();
    
}

function refreshRateIndicator() {
    
    if(typeof currentSituation == "undefined")  {return false;}
    
    document.getElementById("rateIndicator").style.backgroundColor = "darkturquoise";
    
}

function refreshUnderstanding(sitID = -1,ldPassage = 0) {
    
    var understandingDisplay = "";
    
    if(sitID != -1) {
    
        currentSituation = findSituationByID(sitID);
        
    }
    
    if(typeof currentSituation == "undefined") {
        
        return false;
    
    }
    
    //clearInterval(spiQuoteTimer);
    
    for(und of currentSituation._understandingEntries) {
        
        if(currentSituation._effort >= und._understandingEffort) {
            
            understandingDisplay = understandingDisplay + und._understandingQuote + "<br><br>";    
            
        }
        
    }
        
    //refreshSituationButtons();
    document.getElementById("understandingDisplay").innerHTML = understandingDisplay;
    //refreshSpiritQuotes();
    //refreshSpiritIcon();
    //console.log(document.getElementById("understandingDisplay"));
    //console.log(document.getElementById("spirit" + spi._id + "quote").innerHTML);
    

}

function refreshSpiritQuotes() {
    
    var spiritQuote = "";
    
    if(typeof currentSituation == "undefined" || currentSituation._assignedSpirits.length == 0) {
        clearInterval(spiQuoteTimer);
        document.getElementById("spiritQuoteDisplay").innerHTML = "";
        return false;
    }
    
    spiritQuote = "<br><br>";
    
    for(spi of currentSituation._assignedSpirits) {
        
        spiritQuote = spiritQuote + "<span id='spiritIcon" + spi._id + "' style='font-family:Lucida Console'></span> " + spi._name +  ": <span id='spirit" + spi._id + "quote'>test</span><br>";
        
        
    }
    
//    if(currentSituation._assignedSpirits.length > 0) {
//        
//        spiritQuote = spiritQuote + "<br>";
//        
//    }
    
    document.getElementById("spiritQuoteDisplay").innerHTML = spiritQuote;
    
    for(spi of currentSituation._assignedSpirits) {
        
        //find the difficulty of the sitaution
        
        for(compat of currentSituation._spiritCompatability) {
            
            if(compat._spiritCompatName == spi._name) {
                
                var diffQuotes;
                
                if(compat._spiritCompatLevel == "easy") {diffQuotes = spi._easyQuotes;}
                if(compat._spiritCompatLevel == "medium") {diffQuotes = spi._mediumQuotes;}
                if(compat._spiritCompatLevel == "hard") {diffQuotes = spi._hardQuotes;}
                
                if(typeof diffQuotes == "undefined") {
                    return false;
                }
                
            }
            
        }
        
        var pickQuote = diffQuotes[Math.floor(Math.random()*diffQuotes.length)];
        document.getElementById("spirit" + spi._id + "quote").innerHTML = pickQuote;
        refreshSpiritIcon();
    }
    
}

window.onload = refreshSpiritButtons();
window.onload = refreshSituationButtons(0);
window.onload = refreshUnderstanding();
window.onload = tapController();

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
    //document.getElementById("compatQuote"+spiID).innerHTML = "";
    //unassign the spirit from the situation
    funcSpirit._sitAssignment._assignedSpirits = funcSpirit._sitAssignment._assignedSpirits.filter(x => x != funcSpirit);
    //remove the situation assignment from the spirit object
    funcSpirit._sitAssignment = "unassigned";
    refreshSpiritButtons();
    refreshUnderstanding();
    refreshSpiritQuotes(); 
            
    
}

var spiQuoteTimer;

function spiritAssign(spiritID,sitID) {
  
    
  var currentSpirit = findSpiritByID(spiritID);
  
  //get the spirit compatibility quote
  var funcSituation = findSituationByID(sitID);
    
    if(currentSpirit._sitAssignment != "unassigned") {
        
        console.log("reassigning...");
        console.log(currentSpirit._sitAssignment);
        spiritRecall(currentSpirit._id);
    
    }
    
  
  // when a spirit is assigned to a situation, deactivate that situation's button by replacing the button with plaintext
  document.getElementById("spanSpiButt"+spiritID+sitID).innerHTML = sit._name + " ";
  //document.getElementById("compatQuote"+spiritID).innerHTML = funcSituation.findCompatibility(spiritID)._spiritCompatQuote;
  //assign the situation to the spirit object
  currentSpirit._sitAssignment = funcSituation;
  //add the sprit to the situation's array of assigned spirits
  funcSituation._assignedSpirits.push(currentSpirit);
  
    if(funcSituation._assignedSpirits.length == 1) {
  
      spiQuoteTimer = window.setInterval(refreshSpiritQuotes,5000);
      
  }
    
    refreshSpiritButtons();
    refreshSpiritQuotes();  
}

window.onload = document.getElementById("passageDisplay").innerHTML = currentPassage.ptext;


var tapOn = 0;
var buttonTimer = [];
var rateTimer = [];
var tapInterval = 0;
var tapArray = [];
var avgTapInterval = 0;
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

    var blinkReset;
    
    
   if(timerName == "buttonClick") {
       console.log("trig");
        document.getElementById("rateIndicator").style.backgroundColor = "red";
        clearInterval(blinkReset);
        blinkReset = window.setInterval(function(){rateBlink()}, 225);
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

function defaultCurrentSit() {
    
    if(typeof currentSituation == "undefined" && availableSituations.length > 0) {
        
        currentSituation = availableSituations[0];
        
    }
    
}

function refreshSpiritIcon() {
    
    if(typeof currentSituation == "undefined" || currentSituation._assignedSpirits.length == 0) {return false;}
    
    for(spi of currentSituation._assignedSpirits) {
        
        var icon;
        
        icon = Math.floor(Math.random()*8)
        
        if(icon == 0){icon = "<b>~</b>"}
        if(icon == 1){icon = "<b>+</b>"}
        if(icon == 2){icon = "<b>&</b>"}
        if(icon == 3){icon = "<b>*</b>"}
        if(icon == 4){icon = "<b>{</b>"}
        if(icon == 5){icon = "<b>?</b>"}
        if(icon == 6){icon = "<b>#</b>"}
        if(icon == 7){icon = "<b><</b>"}
        if(icon == 8){icon = "<b>|</b>"}
           
        document.getElementById("spiritIcon"+spi._id).innerHTML = icon;
           
       } 
    
}

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

    defaultCurrentSit();
    refreshUnderstanding(currentSituation._situationID);
    
    if(currentSituation._assignedSpirits.length == 0) {
        
        clearInterval(spiQuoteTimer);
        
    }
    
    document.getElementById("rate").innerHTML = avgTapInterval;
    tapQuote = tapQ;
    
    //Do the spirit quote effect
    
    refreshSpiritIcon();
        
    
}