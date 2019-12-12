

//import { wings } from 'passages';

//new Passage(tempPassID, tempPassText, tempPassButt)

//passages

//passages[0] = 

var currentPassage = passage0;

var xmen = "added next passage functionality, fixed ;, passage.text";
window.onload = document.getElementById("main").innerHTML = xmen;
window.onload = document.getElementById("passageDisplay").innerHTML = currentPassage.text;


var buttonRotation = 0;

function buttonSwitch() {
  if (buttonRotation == 0) {
      buttonRotation = 1;
      document.getElementById("buttonImg").innerHTML =  "<button class='button' onclick='buttonSwitch()'><img src='rotatingArrow.gif'></button>";
      var buttonTimer = window.setInterval(resetButton, 805);
      currentPassage = currentPassage.progessbuttons;
      document.getElementById("passageDisplay").innerHTML = currentPassage.text;
      } 
    
 function resetButton() {
      buttonRotation = 0;
     clearInterval(buttonTimer);
      document.getElementById("buttonImg").innerHTML =  "<button class='button' onclick='buttonSwitch()'><img src='arrow.png'></button>";      
  }
