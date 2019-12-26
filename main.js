var currentPassage;
var currentSituation;
var availableSpirits = [];

var availableSituations = [];
var spiritButtons = "";

window.onload = loadPassage(0);

function loadPassage(pID) {
    
    var pass = findPassageByID(pID);
    
    // If the passage has special code associated with it, this will execute that code (the "execute" method of a special class stored in the passages _storyFX property)
    
    if(typeof pass._storyFX != "undefined") {
    
        pass._storyFX.execute();
        
    }
    
    document.getElementById("passageDisplay").innerHTML =  pass._ptext;
    
    // Draw the buttons that advance the story passages below the passage text
    
    currentPassage = pass;
    refreshPassageButtons();
    
    defaultCurrentSit();
    refreshSituationButtons(0);
    refreshRateIndicator();
    rateRefresh();
    refreshSpiritButtons();
    refreshUnderstanding();
}

function refreshPassageButtons() {
    
    var passageButtonsString = "";
    
    for(butt of currentPassage._progressButtons) {
        
        // each butt(on) actually holds the whole passage object that the button leads  to -- that's why it can refer to storyID, linkText, etc.
        
        passageButtonsString = passageButtonsString + "<button onclick='loadPassage(" + butt._storyID + ")'>" + butt._linkText + "</button>" +"<br><div style='height:9px'></div>";
        
    }
    
    document.getElementById("passageButtons").innerHTML = passageButtonsString;
    
}


function refreshSpiritButtons() {
    
    
    // Only draw the spirit buttons if there are situations to address
    
    if(availableSituations.length == 0 || typeof availableSituations == "undefined" ||availableSpirits.length == 0) {
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
                
            }
            
        }


        spiritButtons = spiritButtons + "<br><br>";

    }
    
    //write the combined string to the page

    
    window.onload = document.getElementById("spiritDisplay").innerHTML = spiritButtons;
}

function refreshSituationButtons(x) {
    
    
    if(typeof currentSituation == "undefined") {
        document.getElementById("situationButtons").innerHTML = "";
        return; 
    }
    
    //display the channel button and rate indicators
    
    var situationButtons = "<hr><br><button onclick='buttonSwitch()'>Channel</button> <button onclick='rateRefresh()'>Refresh</button> <span id='rateIndicator' class='rateIndicator'></span> <span id='rate'></span><br><br><span id='rateQuote'></span><hr><br>";
    
    
// for each situation that is available, make a button so that you can display the sprits/understanding info associated with that situation
    
    for(sit of availableSituations) {
        if(currentSituation != sit) {
            
            
            situationButtons = situationButtons + "<button class='button' onclick='sitClick("+sit._situationID+")'>"+sit._name+"</button> ";
            
        }
        
        else {
            situationButtons = situationButtons + "<u>" + sit._name + "</u> ";
            
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
    var undies = 0; //how many understanding entries are displayed?
    
    if(sitID != -1) {
    

        currentSituation = findSituationByID(sitID);
        
    }
    
    if(typeof currentSituation == "undefined") {
        
        understandingDisplay = "";
        document.getElementById("understandingDisplay").innerHTML = understandingDisplay;
        return false;
    
    }
    
    
    for(und of currentSituation._understandingEntries) {
        
        if(currentSituation._effort >= und._understandingEffort) {
            
            undies++;
            
            // if this is the first time this understanding entry is being displayed, execute any special code associated with it (stored in the execute() method of a special class unique to that entry)
            
            if(und._firstView == true && typeof und._storyFX != "undefined") {
            
                und._storyFX.execute();
                und._firstView = false;
            
            }
            
            understandingDisplay = understandingDisplay + und._understandingQuote + "<br><br>";    
            
        }
        
    }
    
    // this just switches a bool if all the understanding entries are currently being displayed for "tooltip" reasons
    
    if(currentSituation._understandingEntries.length == undies) {
        currentSituation._understood = true;
    }
        
    document.getElementById("understandingDisplay").innerHTML = understandingDisplay;
    

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
        
        //find the difficulty of the sitaution and display the spirit quotes associated with that difficulty level
        
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
  
  var funcSituation = findSituationByID(sitID);
    
    // if the spirit is already assigned to another situation, recal that spirit first
    if(currentSpirit._sitAssignment != "unassigned") {
        
        spiritRecall(currentSpirit._id);
    
    }
    
  
  // when a spirit is assigned to a situation, deactivate that situation's button in the spirit button display by replacing the button with plaintext
  document.getElementById("spanSpiButt"+spiritID+sitID).innerHTML = sit._name + " ";
  
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
var secondsIdle = 0;

//need to rename this so that it reflects that it specfically deals with the "channel" button

function buttonSwitch() {

    //make the circular indicator blink red when clicked
    rateBlink("buttonClick");
  
  if(tapOn == 1) {
      
      //calculate the average tap interval for the channel button once the player has tapped it at least twice
      tapArray.push(tapInterval);
      tapInterval = 0;
      for (x of tapArray) {
          avgTapInterval = avgTapInterval + x;   
    		}
      avgTapInterval = avgTapInterval/tapArray.length;
      
  }
    
    //if the player hasn't tapped yet (or has just refreshed), initiate the average tap interval calculation
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
    
    if(typeof currentSituation != "undefined") {
    
        document.getElementById("rateQuote").innerHTML = "";
        
    }
    
}
    
 function setRate() {
      tapInterval = tapInterval + .1;      
  }

function rateBlink(timerName) {

    var blinkReset;
    
    if(typeof currentSituation == "undefined") {
        clearInterval(blinkReset);
        return;
    }
    
    
   if(timerName == "buttonClick") {
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
    
    // if a situation is available but currentSituation has become undefined, set the currentSituation to the first available one
    
    if(typeof currentSituation == "undefined" && availableSituations.length > 0) {
        
        currentSituation = availableSituations[0];
        
    }
    
    //this seems unnecessary given the conditions above? why is this here lol
    
    else if(availableSituations.length == 0) {
        currentSituation = undefined;
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
    
    //If this was triggered by channeling, add effort to situation based on rate. Maybe should move this to channeling function?
    
    if(mode == 2 && typeof currentSituation != "undefined") {
        
    
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
        
        // if the player is making headway, we reset the "idle" counter
        if(tapFX > 0) {secondsIdle = 0;}
        
        currentSituation._effort = currentSituation._effort + tapFX;
        
    }
    
    // If this was triggered by the regular interval, update each situation's effort based on the spirits assigned to it.
    
    if(availableSituations.length == 0 || typeof availableSituations == "undefined") {    
     return false;   
    }
    
    if(mode == 1) {
        
        // for each situation with spirits assigned to it, update that situations effort with the effect of the spirit
        
        for(sit of availableSituations) {
            
            for(compat of sit._spiritCompatability) {
                
                for(spi of sit._assignedSpirits) {
                    
                    if(compat._spiritCompatName == spi._name) {
                        
                        sit._effort = sit._effort + compat._spiritCompatEffort;
                    }
                }      
                
            }
            
        }
        
        if(avgTapInterval > 0) {
            secondsIdle++;
            console.log(secondsIdle);
        }
    
    else {secondsIdle = 0;}
     
    }
        

    defaultCurrentSit();
    
    if(typeof currentSituation != "undefined") {
        
        refreshUnderstanding(currentSituation._situationID);
    
    
        if(currentSituation._assignedSpirits.length == 0) {

            clearInterval(spiQuoteTimer);
        }
    }
    else if(document.getElementById("understandingDisplay") != "") {
        document.getElementById("understandingDisplay") = "";
    }
    
    document.getElementById("rate").innerHTML = avgTapInterval.toFixed(1);

    // if the player hasn't added any effort to the situation in the last 30 seconds and there are still more understanding entries, put up a helpful message
    if(secondsIdle > 30 && typeof currentSituation != "undefined" && currentSituation._understood == false) {
        document.getElementById("rate").innerHTML = document.getElementById("rate").innerHTML + " <i>Seems like this rate isn't working out, maybe try refreshing the rate and trying a different channeling frequency?</i>"; 
    
    }
    
    // do we need tapQuote/tapQ anymore?
    
    tapQuote = tapQ;
    
    //Do the spirit icon animation
    
    refreshSpiritIcon();
        
    
}

//window.setInterval(consol, 100);

function consol() {
    
    console.log(currentSituation);
    
}
