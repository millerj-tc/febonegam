

//import { wings } from 'passages';

//new Passage(tempPassID, tempPassText, tempPassButt)

//passages

//passages[0] = 

var currentPassage = passage0;

var xmen = "added next passage functionality";
window.onload = document.getElementById("main").innerHTML = xmen;
window.onload = document.getElementById("passageDisplay").innerHTML = currentPassage;


var buttonRotation = 0;

function buttonSwitch() {
  if (buttonRotation == 0) {
      buttonRotation = 1;
      document.getElementById("buttonImg").innerHTML =  "<button class='button' onclick='buttonSwitch()'><img src='rotatingArrow.gif'></button>";
      var buttonTimer = window.setInterval(resetButton, 805)
      currentPassage = currentPassage.progessbuttons;
      document.getElementById("passageDisplay").innerHTML = currentPassage;
      } 
    
 function resetButton() {
      buttonRotation = 0;
     clearInterval(buttonTimer);
      document.getElementById("buttonImg").innerHTML =  "<button class='button' onclick='buttonSwitch()'><img src='arrow.png'></button>";      
  }
  
}

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    console.log("?" + String(elem));
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

var count = 0;

window.setInterval(report, 1000);

function report() {
    count = count + 1;
    document.getElementById("count").innerHTML = count;
}
