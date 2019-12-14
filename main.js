var currentPassage = passage0;

var xmen = "added next passage functionality, fixed ;, passage.text";
window.onload = document.getElementById("main").innerHTML = xmen;
window.onload = document.getElementById("passageDisplay").innerHTML = currentPassage.ptext;


var buttonRotation = 0;
var buttonTimer =  [];

function buttonSwitch() {
  if (buttonRotation == 0) {
      buttonRotation = 1;
      document.getElementById("buttonImg").innerHTML =  "<button class='button' onclick='buttonSwitch()'><img src='rotatingArrow.gif'></button>";
      buttonTimer = window.setInterval(resetButton, 650);
      currentPassage = currentPassage.passageLinks;
      document.getElementById("passageDisplay").innerHTML = currentPassage.ptext;
      } 
}
    
 function resetButton() {
      buttonRotation = 0;
     clearInterval(buttonTimer);
      document.getElementById("buttonImg").innerHTML =  "<button class='button' onclick='buttonSwitch()'><img src='arrow.png'></button>";      
  }