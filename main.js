var currentPassage = passage0;

var xmen = "added next passage functionality, fixed ;, passage.text";
window.onload = document.getElementById("main").innerHTML = xmen;
window.onload = document.getElementById("passageDisplay").innerHTML = currentPassage.ptext;


var buttonRotation = 0;
var tapOn = 0;
var buttonTimer =  [];
var rateTimer = [];
var tapInterval = 0;
var tapArray = [];
var avgTapInterval = 0;
var tapDataPoints = 0;

function buttonSwitch() {
  if (tapOn == 0) {
      tapOn = 1;
      //document.getElementById("buttonImg").innerHTML =  "<button class='button' onclick='buttonSwitch()'><img src='rotatingArrow.gif'></button>";
      buttonTimer = window.setInterval(setRate, 500);
      currentPassage = currentPassage.passageLinks;
      document.getElementById("passageDisplay").innerHTML = currentPassage.ptext;
      }
  if(tapOn == 1) {
      //if(tapArray.length == 0) {
      tapArray.push(tapInterval);  
      //}
      //if(tapArray > 0) {
          //avgTapInterval = (avgTapInterval+tapInterval/60)/tapDataPoints;
      //}
      var x;
      for (x of tapArray0 {
          avgTapInterval = avgTapInterval + x; 
          }
      avgTapInterval = avgTapInterval/tapArray.length;
      document.getElementById("rate").innerHTML = avgTapInterval;
}
    
 function setRate() {
      tapInterval = tapInterval + .5;      
  }
